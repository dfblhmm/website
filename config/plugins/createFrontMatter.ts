/**
 * 生成文档 Front Matter
 */
import { execSync } from "child_process";

/**
 * 获取文件最后的修改信息
 */
export const createLastUpdate = (filePath: string) => {
  // 获取文件最后修改时间
  const mtime = execSync(`git log -1 --pretty=format:"%cd" ${filePath}`, { encoding: "utf-8" });
  const lastUpdateTime = new Date(mtime).toLocaleString();
  console.log(filePath, lastUpdateTime);

  return {
    last_update: {
      date: lastUpdateTime
    }
  };
};
