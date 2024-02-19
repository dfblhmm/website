---
title: 栈
slug: ../stack
---
# 栈

## 认识栈

- ==栈==（Stack）是一种受限的==线性结构==，按照==后进先出==的原理运作
  
  - 仅允许在集合的一端（==栈顶==）进行插入（`push`）和删除（`pop`）运算，另一端称为==栈底==
  - 通常使用 **数组** 或 **链表** 来实现
  
- 栈的特点

  - 先进后出，后进先出
  - 除头尾节点之外，每个元素有一个前驱，一个后继

  <img src="./images/栈结构特点.png" alt="栈结构特点" style="zoom:67%;" />

- 栈的两种操作

  - ==入栈==：向一个栈插入新元素，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素

  - ==出栈==：从一个栈删除元素，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素

- 栈的应用
  - 回溯
  - 递归
  - 深度优先搜索



## 封装栈

栈常见的操作

| 属性/方法     | 描述                           |
| ------------- | ------------------------------ |
| push(element) | 向栈顶添加一个元素（element）  |
| pop()         | 将栈顶元素出栈，并返回这个元素 |
| peek()        | 查看栈顶元素                   |
| isEmpty       | 栈是否为空                     |
| size          | 栈内元素个数                   |

### 基于数组实现

```typescript
class ArrayStack<T> {
  /**
   * @description 创建一个数组，用于存放堆栈元素
   */
  private store: T[] = [];

  /**
   * @description 入栈
   * @param element 入栈元素
   */
  push(element: T) {
    this.store.push(element);
  }

  /**
   * @description 出栈
   * @returns 出栈元素
   */
  pop(): T | null {
    return this.store.pop() ?? null;
  }

  /**
   * @description 获取栈顶元素
   */
  peek(): T | null {
    return this.store.at(-1) ?? null;
  }

  /**
   * @description 获取栈的元素个数
   */
  get size(): number {
    return this.store.length;
  }

  /**
   * @description 栈是否为空
   */
  get isEmpty(): boolean {
    return this.size === 0;
  }
}
```



### 基于链表实现

采用 [双向链表](./linkedList/doubly-linkedList#双向链表完整实现) 来存储堆栈元素

```typescript
import DoublyLinkedList from "./DoublyLinkedList";

class LinkedStack<T> {
  /**
   * @description 创建一个双向链表，用于存放堆栈元素
   */
  private store = new DoublyLinkedList<T>();

  /**
   * @description 入栈
   * @param element 入栈元素
   */
  push(element: T) {
    this.store.append(element);
  }

  /**
   * @description 出栈
   * @returns 出栈元素
   */
  pop(): T | null {
    return this.store.removeAt(this.size - 1);
  }

  /**
   * @description 获取栈顶元素
   */
  peek(): T | null {
    return this.store.get(this.size - 1);
  }

  /**
   * @description 获取栈的元素个数
   */
  get size(): number {
    return this.store.size;
  }

  /**
   * @description 栈是否为空
   */
  get isEmpty(): boolean {
    return this.size === 0;
  }
}
```
