import docs from "./docs";
import { removeIndexSuffix } from "../utils";

const sidebarMap = { docs };

/**
 * @description 遍历分类 items
 * @param prefix 跳转链接前缀
 * @param sidebarItems 分类列表
 */
const traverseSidebarItem = (prefix: string, sidebarItems: any[]) =>
  sidebarItems.map((i) => {
    if (typeof i === "string") {
      return {
        type: "doc",
        href: `${prefix}${removeIndexSuffix(i)}`,
        docId: i
      };
    }

    const { type, id, label, link, items } = i;
    const docId = type === "category" ? link.id : id;

    return {
      type: type === "doc" ? "link" : type,
      label,
      href: `${prefix}${removeIndexSuffix(docId)}`,
      docId,
      ...(items && {
        items: traverseSidebarItem(prefix, items)
      })
    };
  });

/**
 * @description 获取侧边栏配置数据
 * @param sidebarId 配置的侧边栏 id
 * @param prefix 生成的分类 href 前缀
 */
export const getSidebarData = (sidebarId: keyof typeof sidebarMap, prefix: string = sidebarId) => {
  const sidebarData: IObject = {};

  prefix = prefix.endsWith("/") ? prefix : `${prefix}/`;

  Object.entries(sidebarMap[sidebarId]).forEach(([key, items]) => {
    sidebarData[key] = traverseSidebarItem(prefix, items as any[]);
  });

  return sidebarData;
};
