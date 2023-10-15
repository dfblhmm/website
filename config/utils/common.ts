/**
 * 去除路径 index 后缀
 * @param path 路径
 */
export const removeIndexSuffix = (path: string) => path.replace(/index$/, '');