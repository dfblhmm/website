/**
 * 转换 ==key== 语法为 <mark>key</mark>
 */
import visit from 'unist-util-visit';

type SyntaxTree = Parameters<typeof visit>['0'];

type SyntaxNode = SyntaxTree & {
  value: string;
  children?: SyntaxNode[];
}

// 完整的位置信息
type SyntaxNodePosition = SyntaxNode['position'];
// 单边的位置信息,start/end
type SyntaxNodePositionSimple = SyntaxNodePosition['end'];

type TransToMarkOptions = {
  content: string; // 文本节点内容
  begin: number; // mark节点开始位置
  markType: 'open' | 'close' // mark标签类型
}

const markReg = /==(.*?)==/;

/**
 * 生成节点位置信息
 * @param prev 上一个节点的位置
 * @param content 节点内容
 */
function createSyntaxNodePosition(prev: SyntaxNodePositionSimple, content: string) {
  const { line, column, offset } = prev;
  const len = content.length;

  return { 
    start: prev,
    end: { line, column: column + len, offset: offset + len }
  };
}

/**
 * 转换前后闭合的==key==为mark标签
 * @param prevPosition 上一个节点的位置
 * @param content 文本内容
 */
function transToFullMark(prevPosition: SyntaxNodePositionSimple, content: string): SyntaxNode[] {
  const matchRes = content.match(markReg);
  if (!matchRes) {
    return [
      { 
        type: 'text',
        value: content,
        position: createSyntaxNodePosition(prevPosition, content)
      }
    ];
  }

  const [input, match] = matchRes;
  const { index } = matchRes;
  const newBegin = index + input.length;

  const { line, column, offset } = prevPosition;
  // 更新prev节点
  const prev = {
    line, 
    column: column + newBegin,
    offset: offset + newBegin
  };

  const nodes = [
    { type: 'text', value: content.slice(0, index) },
    { type: 'jsx', value: '<mark>' },
    { type: 'text', value: match },
    { type: 'jsx', value: '</mark>' },
    ...transToFullMark(prev, content.slice(newBegin))
  ].filter(({ value }) => value) as SyntaxNode[];

  return nodes;
}

/**
 * 转换单边的mark
 * @param options 转换配置
 */
function transToSingleMark(options: TransToMarkOptions): SyntaxNode[] {
  const { content, begin, markType } = options;

  const nodes: SyntaxNode[] = [];

  nodes.push({ type: 'text', value: content.slice(0, begin) });

  if (markType !== 'close') nodes.push({ type: 'jsx', value: '<mark>' });
  if (markType !== 'open') nodes.push({ type: 'jsx', value: '</mark>' });

  nodes.push({ type: 'text', value: content.slice(begin + 2) });

  return nodes.filter(({ value }) => value);
}

/**
 * 判断是否是同一个节点
 * @param n1 节点1
 * @param n2 节点2
 */
function isEqualNode(n1: SyntaxNode, n2: SyntaxNode): boolean {
  const { type: t1, position: { start: s1, end: e1 } } = n1;
  const { type: t2, position: { start: s2, end: e2 } } = n2;

  // 节点类型不同，不属于同一节点
  if (t1 !== t2) return false;
  // 节点开始位置信息不同，不属于同一节点
  if (s1.line !== s2.line || s1.column !== s2.column) return false;
  // 节点位置信息不同，不属于同一节点
  if (e1.line !== e2.line || e1.column !== e2.column) return false;
  return true;
}

/**
 * 获取当前匹配项在语法树中的索引位置
 * @param parent parent 节点
 * @param syntaxNodeList 语法节点List
 * @param matchIndex 字符串索引
 */
function getSyntaxNodeIndex(parent: SyntaxNode, syntaxNodeList: SyntaxNode[], matchIndex: number) {
  // 父节点的offset
  const { offset } = parent.position.start;
  
  for (let i = 0, len = syntaxNodeList.length; i < len; i++) {
    const node = syntaxNodeList[i];
    const { position } = node;
    // 跳过已经转换过的节点
    if (!position) continue;

    const { start, end } = node.position;
    if (matchIndex >= start.offset - offset && matchIndex <= end.offset - offset) {
      return { nodeIndex: i, nodeOffset: start.offset - offset, node };
    }
  }
}

export default () => (tree: SyntaxTree) => {
  let parentLoaded = null;
  visit(tree, 'text', (syntaxNode: SyntaxNode, index: number, parent) => {
    // 同级的所有节点只需转换一次即可
    if (parentLoaded && isEqualNode(parentLoaded, parent as SyntaxNode)) {
      return;
    } 
    // 更新parentNode
    parentLoaded = parent;

    let canMatchMark = false; // 是否匹配到mark

    const syntaxNodeList = (parent.children || []) as SyntaxNode[];
    const temp: SyntaxNode[] = syntaxNodeList.map((node, index) => {
      const { type, value } = node;
      if (type === 'text' && markReg.test(value)) {
        canMatchMark = true;

        // 获取上一个节点的位置信息
        const prevPosition = index === 0 ? parent.position.start : syntaxNodeList[index - 1].position.end;
        return transToFullMark(prevPosition, value);
      }
      return node;
    }).flat();

    const content = temp.map(node => {
      const { type, value, position } = node;
      if (!position) {
        if (type === 'jsx' && /<\/?mark>/.test(value)) return 'xx';
        return value;
      }

      const { start, end } = position;

      if (type !== 'text') {
        return ''.padEnd(end.offset - start.offset, 'x');
      }
      return value;
    }).join('');


    for (const markIterator of content.matchAll(new RegExp(markReg , 'g'))) {
      canMatchMark = true;
      
      const [input] = markIterator;
      const { index } = markIterator;
      const inputLen = input.length;

      // ==key==不处于同一个text节点内
      // 1.开标签
      const { 
        nodeIndex: startNodeIndex, 
        node: { value: startNodeValue }, 
        nodeOffset: startNodeOffset 
      } = getSyntaxNodeIndex(parent as SyntaxNode, temp, index);

      const openMark = transToSingleMark({
        content: startNodeValue,
        begin: index - startNodeOffset,
        markType: 'open'
      });
      temp.splice(startNodeIndex, 1, ...openMark);

      // 2.闭标签
      // mark结束标签
      const { 
        nodeIndex: endNodeIndex,
        node: { value: endNodeValue },
        nodeOffset: endNodeOffset
      } = getSyntaxNodeIndex(parent as SyntaxNode , temp, index + inputLen);

      const closeMark = transToSingleMark({
        content: endNodeValue,
        // 减去结束(==)的2长度，获取结束(==)的开始位置
        begin: (index + inputLen - 2) - endNodeOffset,
        markType: 'close'
      });
      temp.splice(endNodeIndex, 1, ...closeMark);
    }

    if (!canMatchMark) return;
    parent.children = temp.flat();
  });
}