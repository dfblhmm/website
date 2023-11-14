/**
 * 转换 img 元素的属性
 * 1. 转换字符串形式的 style 为对象形式的 style
 * 2. 去掉图片 src 路径前面的相对路径
 */
import { visit } from "unist-util-visit";
import {
  ObjectProperty,
  stringLiteral,
  program,
  expressionStatement,
  objectExpression,
  objectProperty,
  identifier
} from "@babel/types";
import generator from "@babel/generator";
import { parse } from "@babel/parser";

interface MdxJsxAttribute {
  type: "mdxJsxAttribute";
  name: string;
  value: string | IObject;
}

const imgTagReg = /^\s*img\s*$/;

/**
 * transform Babel AST -> EsTree
 * @param obj
 */
const transToEsTree = (obj: IObject) => {
  const { code } = generator(obj);
  const { program } = parse(code, { plugins: ["estree"] });

  return program;
};

/**
 * 将html形式的 style 属性转换为 jsx-prop 形式
 * @param value style属性
 */
function createStyleObjectAttribute(value: MdxJsxAttribute["value"]) {
  if (typeof value === "object") {
    return value;
  }

  // 存储对象键值对
  const objectProperties: ObjectProperty[] = [];

  // 获取属性对
  const attributeArr = value.replaceAll(/\s/g, "").split(";").filter(Boolean);

  // 遍历属性对获取对象键值对
  for (const style of attributeArr) {
    // 获取对象key-value
    const [k, v] = style.split(":");

    // 使用key-value构造property
    const objProp = objectProperty(identifier(k), stringLiteral(v));

    // 完整的对象属性列表
    objectProperties.push(objProp);
  }

  // 构造对象
  const obj = objectExpression(objectProperties);

  // 返回组装好的jsx对象props
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "",
    data: {
      estree: transToEsTree(program([expressionStatement(obj)], [], "module"))
    }
  };
}

/**
 * 转换图片src，去除前面的相对路径
 * @param src 图片路径
 */
function transformImgSrc(src: string): string {
  const staticSrc = src.split(/[\\/]/).filter(Boolean).at(-1);
  return `/${staticSrc}`;
}

export const transformImg = () => (ast: any) => {
  visit(ast, "mdxJsxFlowElement", (node) => {
    const { name, attributes = [] } = node;
    if (!imgTagReg.test(name)) return;

    // transform img attribute
    node.attributes = (attributes as MdxJsxAttribute[]).map((attrNode) => {
      const { name, value } = attrNode;

      let newValue = value;

      switch (name) {
        case "src":
          newValue = transformImgSrc(value as string);
          break;
        case "style":
          newValue = createStyleObjectAttribute(value);
          break;
        default:
          break;
      }

      return { ...attrNode, value: newValue };
    });
  });
};
