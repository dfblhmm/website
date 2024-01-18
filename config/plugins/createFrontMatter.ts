/**
 * 生成文档 Front Matter
 */
import { statSync } from "fs";

/**
 * 获取文件最后的修改信息
 */
export const createLastUpdate = (filePath: string) => {
  // 获取文件最后修改时间
  const { mtime } = statSync(filePath);
  const lastUpdateTime = new Date(mtime).toLocaleString();

  return {
    last_update: {
      date: lastUpdateTime
    }
  };
};
