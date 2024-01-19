import React from "react";
import CodeBlock from "@theme-original/CodeBlock";
import { type Props } from "@theme/CodeBlock";

const CodeBlockWrapper = (props: Props) => {
  return <CodeBlock {...props} />;
};

/**
 * @description 默认 Props
 */
CodeBlockWrapper.defaultProps = {
  /**
   * @description 默认显示代码行号
   */
  showLineNumbers: true
} as Props;

export default CodeBlockWrapper;
