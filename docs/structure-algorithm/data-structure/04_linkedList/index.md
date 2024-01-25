---
title: 链表
slug: ../linkedList
---
# 链表

## 认识链表

- 在计算机科学中，**链表**（Linked list）是一种常见的基础数据结构

  - 是一种==线性结构==，但是并不会按线性的顺序存储数据，而是在每一个节点里存放下一个节点的==指针==
  - 常用于组织 **检索较少，而删除、添加、遍历较多** 的数据

  <img src="./images/linkedList.png" alt="数据结构与算法——单链表_指针"  />

- 链表相对于数组的优缺点

  - 优势
    - 内存空间==不是必须连续==的，可以充分利用计算机的内存，实现灵活的==内存动态管理==
    - 链表不必在创建时就确定大小，并且大小可以==无限的延伸==下去
    - 链表在插入和删除数据时，时间复杂度可以达到 **O(1)**
  - 劣势
    - 失去了数组随机读取的优点，访问元素时必须从头开始查找，时间复杂度 **O(n)**
    - 由于增加了结点的指针域，==空间开销比较大==

- 链表在实现上，又可以分为单向链接、双向链表、循环链表等



## 单向链表

### 认识单向链表

- 单向链表是最简单的一种链表，每一个节点包含两个域：一个==信息域==和一个==指针域==

  - 信息域保存关于节点的信息
  - 指针域存储下一个节点的地址，在最后一个节点保存一个==特殊的结束标记==，比如 `null`
  - 同时还包含一个==头指针== `head`，指向链表的==第一个节点==

  <img src="./images/Single-linked-list.png" alt="单向链表"  />

- 单向链表只可向一个方向遍历



### 封装单向链表

| 方法                  | 描述                       |
| --------------------- | -------------------------- |
| append(val)           | 向链表尾部添加一个节点     |
| insert(position, val) | 向链表指定位置插入一个节点 |
| get(position)         | 查看指定位置的节点         |
| update(position, val) | 修改指定位置节点值         |
| removeAt(position)    | 删除指定位置的节点         |
| isEmpty               | 链表是否为空               |
| size                  | 链表内元素个数             |

#### 初始化链表结构

- 准备一个 `Node` 类，用于创建每个节点的信息

  ```typescript
  /**
   * @description 节点类
   */
  class Node<T> {
    /**
     * @description 节点的值
     */
    val: T;
    /**
     * @description 下一个节点的指针，初始为 null
     */
    next: Node<T> | null = null;
  
    constructor(val: T) {
      this.val = val;
    }
  }
  ```

- 初始化链表类 `LinkedList`，包含一个头指针（指向第一个节点）和长度属性

  ```typescript
  class LinkedList<T> {
    /**
     * @description 链表长度
     */
    private length = 0;
    /**
     * @description 头指针
     */
    private head: Node<T> | null = null;
  
    /**
     * @description 根据位置查找节点
     * @param position 位置
     */
    private findNodeByPosition(position: number) {
      // 遍历中的当前节点
      let current = this.head;
      // 记录前一个节点
      let prev: Node<T> | null = null;
      // 记录当前搜索索引位置
      let index = 0;
  
      while (current && ++index <= position) {
        prev = current;
        current = current.next;
      }
  
      return { prev, target: current };
    }
  
    /**
     * @description 获取链表元素个数
     */
    get size(): number {
      return this.length;
    }
  
    /**
     * @description 链表是否为空
     */
    get isEmpty(): boolean {
      return this.length === 0;
    }
  }
  ```



#### 插入方法 — insert

- `insert` 方法用于==在指定位置插入节点==，返回是否成功插入

  - 情况一：插入的位置是 `0`，即插入到链表头部

    - 先让插入节点 `insertNode.next` 指向原来的头节点
    - 再让头指针 `head` 指向这个插入的节点 `insertNode`

    <img src="./images/image-20240120163344529.png" alt="image-20240120163344529" style="zoom: 67%;" /> 

  - 情况二：插入到其他位置

    - 先根据这个位置，查找到对应的==节点== `target` 和它的==前一个节点== `prev`
    - 让前一个节点 `prev.next` 指向这个插入的节点 `insertNode`
    - 再让插入节点 `insertNode.next` 指向原位置节点 `target`

    <img src="./images/image-20240120163809252.png" alt="image-20240120163809252" style="zoom:67%;" />

- 插入完成后，链表长度 `length` 递增 1

```typescript
class LinkedList<T> {
  /**
   * 向指定位置插入一个节点
   * @param position 指定位置
   * @param val 插入节点值
   * @returns 是否插入成功
   */
  insert(position: number, val: T): boolean {
    // 位置越界，插入失败
    if (position < 0 || position > this.length) return false;

    // 创建新节点
    const insertNode = new Node<T>(val);

    if (position === 0) {
      // 在头部插入
      insertNode.next = this.head;
      this.head = insertNode;
    } else {
      // 查找指定位置的节点
      const { prev, target } = this.findNodeByPosition(position);

      /**
       * 先让上一个节点的 next 指向 insertNode
       * 再让 insertNode 的 next 指向当前位置节点
       */
      prev!.next = insertNode;
      insertNode.next = target;
    }

    // 插入完成，更新链表长度
    this.length++;

    return true;
  }
}
```



#### 添加方法 — append

- `append` 方法用于在链表==末尾==追加节点

- 因此只需要使用 `insert` 方法即可，即在链表长度位置 `length` 处插入

```typescript
class LinkedList<T> {
  /**
   * @description 添加节点
   * @param element 节点值
   */
  append(val: T) {
    // 转化为在最后一个节点后面插入
    this.insert(this.length, val);
  }
}
```



#### 查找方法 — get

`get` 方法用于==查找指定位置的节点==，查找不到返回 `null`

```typescript
class LinkedList<T> {
  /**
   * @description 查询指定位置的节点值，查找不到返回 null
   * @param position 指定位置
   */
  get(position: number): T | null {
    // 位置越界，返回空值
    if (position < 0 || position >= this.length) return null;

    return this.findNodeByPosition(position).target?.val ?? null;
  }
}
```



#### 更新方法 — update

`update` 方法用于==修改指定位置的节点值==，返回是否修改成功

```typescript
class LinkedList<T> {
  /**
   * @description 修改指定位置的节点值
   * @param position 指定位置
   * @param val 节点新值
   * @returns 是否修改成功
   */
  update(position: number, val: T): boolean {
    // 位置越界，修改失败
    if (position < 0 || position >= this.length) return false;

    // 查找指定位置的节点
    const { target } = this.findNodeByPosition(position);

    // 不存在该节点，修改失败
    if (!target) return false;

    // 更新节点值
    target.val = val;

    return true;
  }
}
```



#### 删除方法 — removeAt

- `removeAt` 方法用于==删除指定位置节点==，返回删除的节点值，查找不到返回 `null`

  - 情况一：删除位置是 `0`，即删除链表头部节点

    - 直接让头部 `head` 指向头部节点的下一个节点 `head.next`

    <img src="./images/image-20240120171517344.png" alt="image-20240120171517344" style="zoom: 67%;" /> 

  - 情况二：删除其他位置节点

    - 先根据这个位置，查找到对应的==节点== `target` 和它的==前一个节点== `prev`
    - 让前一个节点 `prev.next` 指向这个删除节点的下一个节点 `target.next`

    <img src="./images/image-20240120174026167.png" alt="image-20240120174026167" style="zoom:67%;" />

- 删除完成后，链表长度 `length` 递减 1

```typescript
class LinkedList<T> {
  /**
   * @description 删除指定位置的节点
   * @param position 指定位置
   * @returns 删除的节点值，删除失败则返回 null
   */
  removeAt(position: number): T | null {
    // 位置越界，删除失败
    if (position < 0 || position >= this.length) return null;

    // 记录删除的节点
    let deletedNode: Node<T> | null = null;

    if (position === 0) {
      deletedNode = this.head;
      // 删除头部节点，让头部指向下一个节点
      this.head = this.head?.next ?? null;
    } else {
      const { prev, target } = this.findNodeByPosition(position);
      deletedNode = target;

      // 非头部节点，让上一个节点的 next 指向当前删除节点的 下一个节点
      prev!.next = target?.next ?? null;
    }

    // 删除完成，更新长度
    this.length--;

    return deletedNode?.val ?? null;
  }
}
```



#### 单向链表完整实现

```typescript
/**
 * @description 节点类
 */
class Node<T> {
  /**
   * @description 节点的值
   */
  val: T;
  /**
   * @description 下一个节点的指针，初始为 null
   */
  next: Node<T> | null = null;

  constructor(val: T) {
    this.val = val;
  }
}

class LinkedList<T> {
  /**
   * @description 链表长度
   */
  private length = 0;
  /**
   * @description 头指针
   */
  private head: Node<T> | null = null;

  /**
   * @description 根据位置查找节点
   * @param position 位置
   */
  private findNodeByPosition(position: number) {
    // 遍历中的当前节点
    let current = this.head;
    // 记录前一个节点
    let prev: Node<T> | null = null;
    // 记录当前搜索索引位置
    let index = 0;

    while (current && ++index <= position) {
      prev = current;
      current = current.next;
    }

    return { prev, target: current };
  }

  /**
   * @description 添加节点
   * @param element 节点值
   */
  append(val: T) {
    // 转化为在最后一个节点后面插入
    this.insert(this.length, val);
  }

  /**
   * 向指定位置插入一个节点
   * @param position 指定位置
   * @param val 插入节点值
   * @returns 是否插入成功
   */
  insert(position: number, val: T): boolean {
    // 位置越界，插入失败
    if (position < 0 || position > this.length) return false;

    // 创建新节点
    const insertNode = new Node<T>(val);

    if (position === 0) {
      // 在头部插入
      insertNode.next = this.head;
      this.head = insertNode;
    } else {
      // 查找指定位置的节点
      const { prev, target } = this.findNodeByPosition(position);

      /**
       * 先让上一个节点的 next 指向 insertNode
       * 再让 insertNode 的 next 指向当前位置节点
       */
      prev!.next = insertNode;
      insertNode.next = target;
    }

    // 插入完成，更新链表长度
    this.length++;

    return true;
  }

  /**
   * @description 查询指定位置的节点值，查找不到返回 null
   * @param position 指定位置
   */
  get(position: number): T | null {
    // 位置越界，返回空值
    if (position < 0 || position >= this.length) return null;

    return this.findNodeByPosition(position).target?.val ?? null;
  }

  /**
   * @description 修改指定位置的节点值
   * @param position 指定位置
   * @param val 节点新值
   * @returns 是否修改成功
   */
  update(position: number, val: T): boolean {
    // 位置越界，修改失败
    if (position < 0 || position >= this.length) return false;

    // 查找指定位置的节点
    const { target } = this.findNodeByPosition(position);

    // 不存在该节点，修改失败
    if (!target) return false;

    // 更新节点值
    target.val = val;

    return true;
  }

  /**
   * @description 删除指定位置的节点
   * @param position 指定位置
   * @returns 删除的节点值，删除失败则返回 null
   */
  removeAt(position: number): T | null {
    // 位置越界，删除失败
    if (position < 0 || position >= this.length) return null;

    // 记录删除的节点
    let deletedNode: Node<T> | null = null;

    if (position === 0) {
      deletedNode = this.head;
      // 删除头部节点，让头部指向下一个节点
      this.head = this.head?.next ?? null;
    } else {
      const { prev, target } = this.findNodeByPosition(position);
      deletedNode = target;

      // 非头部节点，让上一个节点的 next 指向当前删除节点的 下一个节点
      prev!.next = target?.next ?? null;
    }

    // 删除完成，更新长度
    this.length--;

    return deletedNode?.val ?? null;
  }

  /**
   * @description 获取链表元素个数
   */
  get size(): number {
    return this.length;
  }

  /**
   * @description 链表是否为空
   */
  get isEmpty(): boolean {
    return this.length === 0;
  }
}
```
