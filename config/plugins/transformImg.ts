import visit from 'unist-util-visit';
import { parseSync, traverse, Visitor } from '@babel/core';
import {
  JSXExpressionContainer,
  ObjectProperty,
  StringLiteral,

  isJSXIdentifier,
  isStringLiteral,

  stringLiteral,
  jsxExpressionContainer,
  objectExpression,
  objectProperty,
  identifier
} from '@babel/types';
import generator from '@babel/generator';

const imgReg = /^\s*\<img/;

/**
 * 将html形式的style属性转换为jsx形式
 * @param value style属性
 */
function createStyleObjectAttribute(value: string): JSXExpressionContainer {
  // 存储对象键值对
  const objectProperties: ObjectProperty[] = [];

  // 获取属性对
  const attributeArr = value.split(';').filter(Boolean);

  // 遍历属性对获取对象键值对
  for (const style of attributeArr) {
    // 获取对象key-value
    const [k, v] = style.split(':');
    // 使用key-value构造property
    const objProp = objectProperty(identifier(k.trim()), stringLiteral(v.trim()));
    // 完整的对象属性列表
    objectProperties.push(objProp);
  } 

  // 构造对象
  const obj = objectExpression(objectProperties);

  // 返回组装好的jsx对象props
  return jsxExpressionContainer(obj);
}

/**
 * 转换图片src，去除前面的路径
 * @param src 图片路径
 */
function transformImgSrc(src: string): StringLiteral {
  const staticSrc = src.split(/[\\/]/).filter(Boolean).at(-1);
  return stringLiteral(`/${staticSrc}`);
}

function transFormImg(jsx: string): string {
  // 获取 ast
  const ast = parseSync(jsx, { filename: 'img' });

  // 属性转换器
  const styleAttributeVisitor: Visitor = { 
    JSXAttribute(path) {
      const { name, value } = path.node;
      if (!isStringLiteral(value)) return;

      const v = value.value.trim();

      // style 属性
      if (isJSXIdentifier(name, { name: 'style' })) {
        path.node.value = createStyleObjectAttribute(v);
      }

      // src 属性
      if (isJSXIdentifier(name, { name: 'src' })) {
        path.node.value = transformImgSrc(v);
      }
    }
  };
  
  // 遍历并修改ast
  traverse(ast, {
    JSXOpeningElement(path) {
      // 解析 img 元素
      if (!isJSXIdentifier(path.node.name, { name: 'img' })) return;
      // 遍历属性并转换
      path.traverse(styleAttributeVisitor);
    }
  });

  return generator(ast).code.slice(0, -1);
}


export default () => (ast) => {
  visit(ast, 'jsx', (node: any) => {
    const { value } = node;
    if (!imgReg.test(value)) return;

    node.value = transFormImg(value);
  });
}