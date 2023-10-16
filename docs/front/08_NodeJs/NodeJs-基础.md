---
id: node-basic
title: 基础
---
# Node.js

## 认识 Node.js

### 定义

- 官方定义：**Node.js** 是一个==开源==、==跨平台==的 **JavaScript** 运行环境  

  ```markdown
  Node.js® is an open-source, cross-platform JavaScript runtime environment.
  ```

- **Node.js** 基于 ==V8== 引擎来执行 JavaScript 的代码，但是不仅包含 V8 引擎

  - V8 可以嵌入到任何 C++ 应用程序 中，无论是 Chrome 还是 Node.js，都是嵌入了 V8 引擎来执行 JavaScript 代码
  - 在 Chrome 浏览器中，还需要解析、渲染 HTML、CSS 等，另外还需要提供支持浏览器操作的 API、浏览器自己的事件循环等
  - 在 Node.js 中也提供了一些额外的操作，比如文件系统读写、网络 IO、加密、压缩解压文件等操作



### 架构

- **浏览器** 和 **Node.js** 差异

  <img src="./images/image-20230219223413597.png" alt="image-20230219223413597" style="zoom:80%;" />

- **Node.js** 架构

  <img src="./images/image-20230219223543038.png" alt="image-20230219223543038" style="zoom: 67%;" />

  - JavaScript 代码会经过 V8 引擎，再通过 Node.js 的 Bindings，将任务放到 Libuv 的事件循环中
  - **Libuv** 是 使用 ==C 语言==编写的库（https://libuv.org/）
  - Libuv 提供了事件循环、文件系统读写、网络 IO、线程池 等内容



### 应用场景

- 第三方包以 npm 包的形式发布在 npm ==registry== 中
- npm、yarn、pnpm 等==包管理工具==需要依赖 Node.js 运行
- 使用 Node.js 作为 web 服务器开发、中间件、代理服务器
- **SSR** 需要借助 Node.js 完成前后端渲染
- 编写脚本工具（command.js）
- 使用 Electron 来开发桌面应用程序（基于 Node.js）



### 运行 JavaScript

- 使用 Node.js 运行 js 文件：直接跟上需要运行的文件即可

  ```bash
  node ./要运行的文件.js
  ```

- 在执行程序的过程中，可以传递一些参数

  ```bash
  node test.js env=development
  ```

- 可以使用 `process.argv` 获取参数==数组==

  ```js
  /**
   * [
      'D:\\nodejs\\node.exe',
      'D:\\code\\Node.js\\code\\01_认识Node.js\\01_获取参数.js',
      'env=development'
    ]
   */
  console.log(process.argv);
  ```



### 全局对象

- 特殊的全局对象
  - 这些全局对象实际上是==模块==中的变量 ，只是每个模块都有，像是全局变量；在命令行交互中不可以使用
  - `__dirname`：获取当前文件所在的路径（不包括文件名）
  - `__filename`：获取当前文件所在的路径和文件名称（包括后面的文件名称）
- 常见的全局对象
  - `process` 对象：提供了 Node 进程中相关的信息。比如 Node 的运行环境、参数信息等
  - `console` 对象：提供了简单的控制台输出函数
  - 定时器函数
    - `setTimeout/setInterval`
    - `setImmediate`
    - `process.nextTick`

- `global` 对象
  - Node 环境的全局对象（类似于浏览器中的 window）
  - 与浏览器中 `window` 的区别：在顶层作用域中通过 `var` 声明的变量不会作为属性添加到全局对象中

