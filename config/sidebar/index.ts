import docs from './docs';
import { removeIndexSuffix } from '../utils';

const sidebarMap = { docs };

/**
 * 遍历分类 items
 */
const traverseSidebarItem = (prefix: string, sidebarItems: any[]) => sidebarItems.map(i => {
  if (typeof i === 'string') {
    return {
      type: 'doc',
      href: `/${prefix}/${removeIndexSuffix(i)}`,
      docId: i
    };
  }

  const { type, id, label, link, items } = i;
  const docId = type === 'category' ? link.id : id;

  return {
    type: type === 'doc' ? 'link' : type,
    label,
    href: `/${prefix}/${removeIndexSuffix(docId)}`,
    docId,
    ...(items && {
      items: traverseSidebarItem(prefix, items)
    })
  };
});

/**
 * 获取侧边栏配置数据
 */
export const getSidebarData = (sidebar: keyof typeof sidebarMap) => {
  const sidebarData: IObject = {};

  Object.entries(sidebarMap[sidebar]).forEach(([key, items]) => {
    sidebarData[key] = traverseSidebarItem(sidebar, items as any[]);
  });

  return sidebarData;
}