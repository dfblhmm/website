---
title: 双向链表
slug: ../doubly-linkedList
---
# 双向链表

## 认识双向链表

- **双向链表**（Doubly LinkedList）是一种特殊的链表数据结构

  - 它的每个数据结点中都有两个指针，分别指向==直接后继==和==直接前驱==节点

  <img src="./images/双向链表.png" style="zoom:67%;" />

- 从双向链表中的任意一个结点开始，都可以很方便地访问它的前驱结点和后继结点

  - 双向链表既可以从头遍历到尾，又可以从尾遍历到头



## 封装双向链表

| 方法                    | 描述                             |
| ----------------------- | -------------------------------- |
| append(value)           | 向链表尾部添加一个节点           |
| prepend(value)          | 向链表头部添加一个节点           |
| insert(position, value) | 向链表指定位置插入一个节点       |
| get(position)           | 查看指定位置的节点               |
| update(position, value) | 修改指定位置节点值               |
| removeAt(position)      | 删除指定位置的节点               |
| traverse()              | 从头部向后遍历链表，返回遍历结果 |
| postTraverse()          | 从尾部向前遍历链表，返回遍历结果 |
| isEmpty                 | 链表是否为空                     |
| size                    | 链表内元素个数                   |

### 初始化双向链表结构

- 由于双向链表增加了==前驱节点==指针，因此需要对 **节点类** 增加属性 `prev`

  ```typescript
  /**
   * @description 双向链表节点类
   */
  class DoublyLinkedNode<T> {
    /**
     * @description 节点的值
     */
    value: T;
    /**
     * @description 上一个节点的指针，初始为 null
     */
    prev: DoublyLinkedNode<T> | null = null;
    /**
     * @description 下一个节点的指针，初始为 null
     */
    next: DoublyLinkedNode<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
    }
  }
  ```

- 同时链表类初始化头尾指针时，也需要修改为对应的节点类型

  ```typescript
  /**
   * @description 双向链表
   */
  class DoublyLinkedList<T> {
    /**
     * @description 链表长度
     */
    private length = 0;
    /**
     * @description 头指针
     */
    private head: DoublyLinkedNode<T> | null = null;
    /**
     * @description 尾指针
     */
    private tail: DoublyLinkedNode<T> | null = null;
  }
  ```



### 插入方法 — insert

- 情况一：链表为空，直接让头尾指针都指向这个新增的节点

  <img src="./images/双向链表插入-空链表.png" style="zoom:67%;" />

- 情况二：在头部插入节点

  <img src="./images/双向链表插入-头部.png" style="zoom:67%;" />

  - 先让【插入节点】的 next 指向【头部节点】
  - 再让【头部节点】的 prev 指向【插入节点】
  - 最后让头指针指向这个【插入节点】，使其称为新的【头部节点】

- 情况三：在尾部插入节点

  <img src="./images/双向链表插入-尾部.png" style="zoom:67%;" />

  - 先根据尾指针找到【尾部节点】，让其 next 指向【插入节点】
  - 再让【插入节点】的 prev 指向【尾部节点】
  - 最后让尾指针重新指向这个【插入节点】

- 情况四：在中间位置插入

  ![双向链表插入-中间](./images/双向链表插入-中间.png)

  - 先查询插入位置的节点
  - 再让插入位置【前一个节点】和【当前插入的节点】互为相邻节点
  - 最后让【插入节点】和【当前插入位置节点】互为相邻节点



### 删除方法 — removeAt

- 情况一：链表为空，直接终止删除操作

- 情况二：非空链表中只有一个节点，直接让头尾指针都指向 null 即可

  <img src="./images/双向链表删除-只有一个节点.png" style="zoom:67%;" />

- 情况三：在非空链表头部删除节点

  ![双向链表删除-头部](./images/双向链表删除-头部.png)

  - 先让头指针指向【头节点的下一个节点】
  - 再让头节点的 prev 指向 null

- 情况四：在非空链表尾部删除节点

  ![双向链表删除-尾部](./images/双向链表删除-尾部.png)

  - 先根据尾指针获取尾节点的前一个节点
  - 再将【前一个节点】的 next 指向 null
  - 最后将尾指针指向【前一个节点】

- 情况五：在非空链表中间删除节点

  ![双向链表删除-中间](./images/双向链表删除-中间.png)

  - 先根据删除位置查询节点
  - 再让【删除节点前一个节点】的 next 指向【删除节点的下一个节点】
  - 再让【删除节点的下一个节点】的 prev 指向【删除节点前一个节点】



### 遍历方法 — postTraverse

`postTraverse` 方法用于从尾部开始向前遍历，只需要修改循环条件，沿着 `prev` 指针遍历即可

```typescript
/**
 * @description 双向链表
 */
class DoublyLinkedList<T> {
  /**
   * @description 从尾部向前遍历链表
   * @returns 遍历结果数组
   */
  postTraverse() {
    // 声明一个数组，用于存放遍历结果
    const result: T[] = [];
    // 从头节点开始遍历
    let current = this.tail;

    while (current) {
      result.push(current.value);
      current = current.prev;
    }

    return result;
  }
}
```



### 双向链表完整实现

- `prepend` 方法可以转化为==在位置为 0 的位置插入==

- 除了上述实现的几个方法外，其他方法可以直接复用单向链表的方法

```typescript
/**
 * @description 双向链表节点类
 */
class DoublyLinkedNode<T> {
  /**
   * @description 节点的值
   */
  value: T;
  /**
   * @description 上一个节点的指针，初始为 null
   */
  prev: DoublyLinkedNode<T> | null = null;
  /**
   * @description 下一个节点的指针，初始为 null
   */
  next: DoublyLinkedNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * @description 双向链表
 */
class DoublyLinkedList<T> {
  /**
   * @description 链表长度
   */
  private length = 0;
  /**
   * @description 头指针
   */
  private head: DoublyLinkedNode<T> | null = null;
  /**
   * @description 尾指针
   */
  private tail: DoublyLinkedNode<T> | null = null;

  /**
   * @description 根据位置查找节点
   * @param position 位置
   */
  private findNodeByPosition(position: number): DoublyLinkedNode<T> | null {
    // 从头节点开始遍历
    let current = this.head;
    // 记录当前搜索索引位置
    let index = 0;

    while (current && ++index <= position) {
      current = current.next;
    }

    return current;
  }

  /**
   * @description 从头部向后遍历链表
   * @returns 遍历结果数组
   */
  traverse(): T[] {
    // 声明一个数组，用于存放遍历结果
    const result: T[] = [];
    // 从头节点开始遍历
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  /**
   * @description 从尾部向前遍历链表
   * @returns 遍历结果数组
   */
  postTraverse() {
    // 声明一个数组，用于存放遍历结果
    const result: T[] = [];
    // 从头节点开始遍历
    let current = this.tail;

    while (current) {
      result.push(current.value);
      current = current.prev;
    }

    return result;
  }

  /**
   * 向链表头部添加节点
   * @param value 节点值
   */
  prepend(value: T) {
    // 转化为在头部插入
    this.insert(0, value);
  }

  /**
   * @description 向链表尾部添加节点
   * @param element 节点值
   */
  append(value: T) {
    // 转化为在最后一个节点后面插入
    this.insert(this.length, value);
  }

  /**
   * 向指定位置插入一个节点
   * @param position 指定位置
   * @param value 插入节点值
   * @returns 是否插入成功
   */
  insert(position: number, value: T): boolean {
    // 位置越界，插入失败
    if (position < 0 || position > this.length) return false;

    // 创建新节点
    const insertNode = new DoublyLinkedNode<T>(value);

    if (this.length === 0) {
      /**
       * 情况一：链表为空，直接让头尾指针都指向【新增的节点】
       */
      this.head = insertNode;
      this.tail = insertNode;
    } else {
      if (position === 0) {
        /**
         * 情况二：在头部插入节点
         */
        // 1.【插入节点】的 next 指向【头部节点】
        insertNode.next = this.head;
        // 2.【头部节点】的 prev 指向【插入节点】
        this.head!.prev = insertNode;
        // 3. 让头指针指向这个【插入节点】，使其称为新的【头部节点】
        this.head = insertNode;
      } else if (position === this.length) {
        /**
         * 情况三：在尾部插入节点
         */
        // 1.根据尾指针找到【尾部节点】，让其 next 指向【插入节点】
        this.tail!.next = insertNode;
        // 2.【插入节点】的 prev 指向【尾部节点】
        insertNode.prev = this.tail;
        // 3.尾指针重新指向这个【插入节点】
        this.tail = insertNode;
      } else {
        /**
         * 情况四：在中间位置插入
         */
        // 查询插入位置的节点
        const target = this.findNodeByPosition(position)!;
        // 获取插入位置的前一个节点
        const prev = target.prev!;

        // 1.让插入位置【前一个节点】和【当前插入的节点】互为相邻节点
        prev!.next = insertNode;
        insertNode.prev = prev;

        // 2.让【插入节点】和【当前插入位置节点】互为相邻节点
        insertNode.next = target;
        target.prev = insertNode;
      }
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

    return this.findNodeByPosition(position)?.value ?? null;
  }

  /**
   * @description 修改指定位置的节点值
   * @param position 指定位置
   * @param value 节点新值
   * @returns 是否修改成功
   */
  update(position: number, value: T): boolean {
    // 位置越界，修改失败
    if (position < 0 || position >= this.length) return false;

    // 查找指定位置的节点
    const target = this.findNodeByPosition(position);

    // 不存在该节点，修改失败
    if (!target) return false;

    // 更新节点值
    target.value = value;

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

    // 记录删除的节点，初始值为头节点
    let deletedNode: DoublyLinkedNode<T> | null = this.head;

    if (this.length === 1) {
      /**
       * 情况一：链表中只有一个节点，直接让头尾指针都指向 null 即可
       */
      this.head = null;
      this.tail = null;
    } else {
      if (position === 0) {
        /**
         * 情况二：在头部删除节点
         */
        // 1.头指针指向【头节点的下一个节点】
        this.head = this.head!.next;
        // 2.头节点的 prev 指向 null
        this.head!.prev = null;
      } else if (position === this.length - 1) {
        /**
         * 情况三：在尾部删除节点
         */
        // 存储删除节点
        deletedNode = this.tail;
        // 1.获取尾节点的前一个节点
        const prev = this.tail!.prev!;
        // 2.【前一个节点】的 next 指向 null
        prev.next = null;
        // 3.尾指针指向【前一个节点】
        this.tail = prev;
      } else {
        /**
         * 情况四：在中间位置删除节点
         */
        // 1.查询删除位置的节点
        const target = this.findNodeByPosition(position)!;
        // 2.【删除节点前一个节点】的 next 指向【删除节点的下一个节点】
        target.prev!.next = target.next;
        // 3.【删除节点的下一个节点】的 prev 指向【删除节点前一个节点】
        target.next!.prev = target.prev;
        // 记录删除节点
        deletedNode = target;
      }
    }

    // 删除完成，更新长度
    this.length--;

    // 返回删除的节点值
    return deletedNode?.value ?? null;
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
