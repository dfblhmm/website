import { readdirSync } from "fs";
import { resolve } from "path";

/**
 * 去除路径 index 后缀
 * @param path 路径
 */
export const removeIndexSuffix = (path: string) => path.replace(/index$/, "");

/**
 * @description 获取静态资源路径
 */
export const getStaticDirectories = (
  rootPath: string,
  options: {
    type: "file" | "folder";
    name: string;
    test?: RegExp;
  },
  directories: string[] = []
) => {
  const { type, name, test } = options;
  const dirent = readdirSync(rootPath, { withFileTypes: true });

  for (const file of dirent) {
    const { name: fileName, path } = file;

    const isTarget = test ? test.test(fileName) : name === fileName;
    const targetFilePath = resolve(path, name);

    if (file.isDirectory()) {
      // 目录
      if (type === "folder" && isTarget) {
        directories.push(targetFilePath);
      }

      // 子路径
      const subPath = resolve(path, fileName);

      getStaticDirectories(subPath, options, directories);
    } else if (file.isFile()) {
      // 文件
      if (type === "file" && isTarget) {
        directories.push(targetFilePath);
      }
    }
  }

  return directories;
};
