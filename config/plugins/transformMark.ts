/**
 * 转换 ==key== 语法为 <mark>key</mark>
 */
import { visit } from "unist-util-visit";
// @ts-ignore
import * as Unist from "@types/unist";

interface SyntaxNode extends Unist.Node {
  isLoaded?: boolean;
  name?: string;
  value?: string;
  children?: SyntaxNode[];
}

// 完整的位置信息
type Position = SyntaxNode["position"];
// 单边的位置信息,start/end
type Point = Position["end"];

const markReg = /==(.*?)==/;

/**
 * @description 生成 Text 节点
 * @param content 内容
 * @param start 开始坐标
 * @param end 结束坐标
 */
function createTextNode(content: string, start: Point, end?: Point): SyntaxNode | null {
  if (!content) return null;

  return {
    type: "text",
    value: content,
    position: {
      start,
      end: end ?? fixPoint(start, content.length)
    }
  };
}

/**
 * @description 生成 <mark>key</mark> 标签
 * @param children
 * @param position
 */
function createMarkTag(children: SyntaxNode[], position: Position): SyntaxNode {
  return {
    type: "mdxJsxTextElement",
    name: "mark",
    position,
    children: children.filter(Boolean)
  };
}

/**
 * @description 修正坐标
 * @param point
 * @param increment 增量
 */
function fixPoint(point: Point, increment: number): Point {
  const { line, column, offset } = point;

  return {
    line,
    column: column + increment,
    offset: offset + increment
  };
}

/**
 * 转换前后闭合的==key==为mark标签
 * @param prevPosition 上一个节点结束的位置
 * @param content 文本内容
 */
function transToFullMark(prevPoint: Point, content: string): SyntaxNode[] {
  const matchRes = content.match(markReg);

  if (!matchRes) {
    return [createTextNode(content, prevPoint)].filter(Boolean);
  }

  const [input, match] = matchRes;
  const { index } = matchRes;
  const inputLen = input.length;

  // mark 开始标签开始位置
  const start = fixPoint(prevPoint, index);
  // mark 结束标签结束位置
  const end = fixPoint(start, inputLen);

  const nodes = (
    [
      // before Node
      createTextNode(content.slice(0, index), prevPoint),
      // <mark>key</mark> 节点
      createMarkTag([createTextNode(match, fixPoint(start, 2), fixPoint(end, -2))], { start, end }),
      // 解析后续节点中包含的 ==key==
      ...transToFullMark(end, content.slice(index + inputLen))
    ].filter(Boolean) as SyntaxNode[]
  ).flat(Infinity);

  return nodes;
}

/**
 * 合并==key== 的两边 mark 标签
 */
interface CombineSingleMarkOptions {
  /**
   * @description 左侧节点
   */
  leftNode: SyntaxNode;
  /**
   * @description 右侧节点
   */
  rightNode: SyntaxNode;
  /**
   * @description ==key== 中间的节点
   */
  children: SyntaxNode[];
}

function combineSingleMark({ leftNode, rightNode, children }: CombineSingleMarkOptions): SyntaxNode[] {
  // mark 开标签 start - 开始位置
  const { value: leftValue, position: leftPosition } = leftNode;
  const start = leftValue.match(/==/).index;

  // mark 闭标签 end - 结束位置
  const { value: rightValue, position: rightPosition } = rightNode;
  const end = rightValue.match(/==/).index + 2;

  return [
    // 开标签左侧节点
    createTextNode(leftValue.slice(0, start), leftPosition.start),
    // 标签体内容
    createMarkTag(
      [
        createTextNode(leftValue.slice(start + 2), fixPoint(leftPosition.start, start + 2)),
        ...children,
        createTextNode(rightValue.slice(0, end - 2), rightPosition.start)
      ].filter(Boolean),
      {
        start: fixPoint(leftPosition.start, start),
        end: fixPoint(rightPosition.start, end)
      }
    ),
    // 闭标签右侧节点
    createTextNode(rightValue.slice(end), fixPoint(rightPosition.start, end))
  ].filter(Boolean);
}

/**
 * 获取当前匹配项在语法树中的索引位置
 * @param parent parent 节点
 * @param syntaxNodeList 语法树List
 * @param matchIndex 匹配字符串索引
 */
function getSyntaxNodeIndex(parent: SyntaxNode, syntaxNodeList: SyntaxNode[], matchIndex: number) {
  // 父节点的offset
  const { offset } = parent.position.start;

  for (let i = 0, len = syntaxNodeList.length; i < len; i++) {
    const node = syntaxNodeList[i];

    const { start, end } = node.position;

    if (matchIndex >= start.offset - offset && matchIndex <= end.offset - offset) {
      return { nodeIndex: i, node };
    }
  }
}

export const transformMark = () => (ast: SyntaxNode) => {
  visit(ast, "text", (node: SyntaxNode, i: number, parent: SyntaxNode) => {
    // 跳过转换过的节点
    if (parent.isLoaded || node.isLoaded) return;

    let canMatchMark = false; // 是否匹配到mark

    // 获取当前 Text 节点的所有同级节点
    const syntaxNodeList = parent.children || [];

    let preMark = 0;

    const temp: SyntaxNode[] = syntaxNodeList
      .map((node, index) => {
        const { type, value } = node;

        if (type !== "text") return node;

        const reg = value.match(markReg);

        if (!reg) {
          preMark += /==/.test(value) ? 1 : 0;
          return node;
        }

        // 单边的 mark 数量
        const singleMarkMatch = value.match(/==/g).length;

        // 严格匹配, == 成对出现
        if (reg[0] !== reg.input && singleMarkMatch % 2 !== 0) {
          return node;
        }

        if (singleMarkMatch % 2 === 0 && preMark % 2 !== 0) {
          return node;
        }

        preMark += singleMarkMatch;

        // 独立的 ==key== 文本节点
        canMatchMark = true;

        // 获取上一个节点的结束位置信息
        const prevPosition = index === 0 ? parent.position.start : syntaxNodeList[index - 1].position.end;

        return transToFullMark(prevPosition, value);
      })
      .flat();

    // 过滤其他干扰节点
    const content = temp
      .map(({ type, value, position }) => {
        const { start, end } = position;

        if (type !== "text") {
          return "".padEnd(end.offset - start.offset, "x");
        }

        return value;
      })
      .join("");

    for (const markIterator of content.matchAll(new RegExp(markReg, "g"))) {
      canMatchMark = true;

      const [input] = markIterator;
      const { index } = markIterator;
      const inputLen = input.length;

      // ==key==不处于同一个text节点内
      // 1.开标签
      const { nodeIndex: leftNodeIndex, node: leftNode } = getSyntaxNodeIndex(parent, temp, index);

      // 2.闭标签
      // mark结束标签
      const { nodeIndex: rightNodeIndex, node: rightNode } = getSyntaxNodeIndex(parent, temp, index + inputLen);

      let replacer: SyntaxNode[] = [];

      if (leftNode === rightNode) {
        // ==key== 处于同一节点内
        replacer = transToFullMark(leftNode.position.start, leftNode.value);
      } else {
        replacer = combineSingleMark({
          leftNode,
          rightNode,
          children: temp.slice(leftNodeIndex + 1, rightNodeIndex)
        });
      }

      temp.splice(leftNodeIndex, rightNodeIndex - leftNodeIndex + 1, ...replacer);
    }

    // 未匹配到 ==key== 语法
    if (!canMatchMark) return;

    parent.isLoaded = true;
    parent.children = temp.flat().map((i) => ({ ...i, isLoaded: true }));
  });
};
