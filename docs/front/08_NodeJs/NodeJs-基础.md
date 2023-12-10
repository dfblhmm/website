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



### 版本发布

- Node.js 的版本分为两个版本

  <img src="./images/image-20231210155341531.png" alt="image-20231210155341531" style="zoom:50%;" />

  - ==LTS== 版本：相对稳定一些，推荐线上环境使用该版本
  - ==Current== 版本：最新的版本，包含很多新特性，相对不稳定，API 可能随时发生变更

- *LTS* 版本状态是“长期支持”，通常保证关键错误将在总共 30 个月内得到修复

- 使用版本切换工具，可以快速、方便的切换 Node.js 版本

  - `n`：仅在 *Linux* 平台可用

    ```bash
    # 全局安装工具 n
    npm i -g n
    # 查看所有版本
    n
    # 升级到最新 LTS 版本
    n lts
    ```

  - `nvm-windows`：*windows* 平台上的版本切换工具

  

### 应用场景

- 第三方包以 npm 包的形式发布在 npm ==registry== 中
- npm、yarn、pnpm 等==包管理工具==需要依赖 Node.js 运行
- 使用 Node.js 作为 web 服务器开发、中间件、代理服务器
- ==SSR== 需要借助 Node.js 完成前后端渲染
- 编写脚本工具（command.js）
- 使用 Electron 来开发桌面应用程序（基于 Node.js）





## 使用 Node.js

### 全局对象

- 常见的全局对象
  - `process` 对象：提供了 Node 进程中相关的信息。比如 Node 的运行环境、参数信息等
  - `console` 对象：提供了简单的控制台输出函数
  - 定时器函数
    - `setTimeout/setInterval`
    - `setImmediate`
    - `process.nextTick`

- 特殊的全局对象
  - 这些全局对象实际上是==模块==中的变量 ，只是每个模块都有，像是全局变量；在命令行交互中不可以使用
  - `__dirname`：获取当前文件所在的路径（不包括文件名）
  - `__filename`：获取当前文件所在的路径和文件名称（包括后面的文件名称）

- `global` 对象
  - Node 环境的全局对象（类似于浏览器中的 window）
  - 与浏览器中 `window` 的区别：在顶层作用域中通过 `var` 声明的变量不会作为属性添加到全局对象中



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





## 常用内置模块

### 文件系统 — fs

#### 认识文件系统

- `fs` 是 **File System** 的缩写，表示文件系统

- 对于==服务器端==语言或框架，往往都需要与文件系统建立连接
  - 提供静态服务，就需要服务器能读取磁盘资源并返回给客户端
  - 使用数据库存储用户数据，数据库本身也是在操作文件
  - 读写配置文件

- Node.js 文件操作的 API 分为了三大类

  - 同步操作：代码会被阻塞，不会继续执行

    ```js
    const { readFileSync } = require("fs");
    
    /**
     * @description 同步操作
     */
    const content = readFileSync("./demo.txt", { encoding: "utf-8" });
    console.log(content);
    ```

  - 异步回调函数操作：代码不会被阻塞，当获取到结果时，传入的回调函数被执行

    ```js
    const { readFile } = require("fs");
    
    /**
     * @description 异步回调操作
     */
    readFile("./demo.txt", (err, data) => {
      if (err) return;
      console.log(data.toString());
    });
    ```

  - 异步 **Promise** 操作：返回一个 **Promise**

    ```js
    const { readFile } = require("fs/promises");
    
    /**
     * @description Promise 异步操作
     */
    readFile("./demo.txt", { encoding: "utf-8" })
      .then((content) => console.log(content))
      .catch((err) => console.error(err));
    ```



#### 文件操作符

- 文件描述符（File Descriptors）
  - 在常见的操作系统上，对于每个进程，内核都维护着一张当前打开着的==文件==和==资源==的表格
  - 每个==打开的==文件都分配了一个称为文件描述符的简单的==数字标识符==
  - 在系统层，所有文件系统操作都使用这些文件描述符来==标识==和==跟踪==每个特定的文件
  - **Windows** 系统使用了一个虽然不同但概念上类似的机制来跟踪资源

- 为了简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符

- `fs.open()` 方法用于分配新的文件描述符

  - 一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息

  ```js
  const { readFileSync, openSync } = require("fs");
  
  const fd = openSync("./demo.txt");
  const content = readFileSync(fd, { encoding: "utf-8" });
  
  console.log(content);
  ```

  

#### 文件读写

- `readFile`：读取文件内容

  ```js
  const { readFileSync } = require("fs");
  
  /**
   * @description 读取文件
   */
  const content1 = readFileSync("./demo.txt");
  
  /**
   * @description 不配置编码格式，默认返回 Buffer
   * <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73 21>
   */
  console.log(content1);
  
  const content2 = readFileSync("./demo.txt", { encoding: "utf-8" });
  /**
   * Hello Node.js!
   */
  console.log(content2);
  ```

- `watchFile`：写入文件内容

  ```js
  const { writeFileSync } = require("fs");
  
  writeFileSync("./demo.txt", "Hello World!", {
    /**
     * @description "a+" 代表在文件 “末尾追加”，不配置 flag 默认会覆盖原文件
     */
    flag: "a+"
  });
  ```

- 读取/写入可以传入一个额外的配置对象

  - `flag`：文件的读写方式
  - `encoding`：文件读/写的编码格式，不进行配置则默认使用 `Buffer`（二进制数据）



#### 文件夹操作

- `mkdirSync`：新建文件夹

- `readdirSync`：获取文件夹内的内容

  - `withFileTypes`：设置此属性为 ==true==，获得的文件对象会携带文件类型判断方法

  ```js
  const { readdirSync } = require("fs");
  const { resolve } = require("path");
  
  /**
   * 获取文件夹内的所有文件列表
   * @param {string} dir 目录路径
   */
  function getDirFileList(dir, temp = []) {
    const dirent = readdirSync(dir, { withFileTypes: true });
  
    for (const file of dirent) {
      const { name } = file;
  
      if (file.isDirectory()) {
        // 文件夹
        getDirFileList(resolve(dir, name), temp);
      } else if (file.isFile()) {
        // 文件
        temp.push(name);
      }
    }
  
    return temp;
  }
  
  const list = getDirFileList("./");
  ```



### 路径解析 — path

- `path` 模块用于 Node.js 中的路径获取、解析、拼接等场景

- 常见 API

  - `resolve()`：路径拼接，遇到 `/`、相对路径时==解析查找==后进行拼接
  - `basename()`：获取文件名
  - `extname()`：获取文件后缀名

  



### 事件系统 — events

- Node.js 中的核心 API 都是基于==异步事件==驱动的
  - 在这个体系中，某些对象（发射器）发出某一个事件
  - 监听这个事件（监听器），并且传入的回调函数，这个回调函数会在监听到事件时调用

- 使用方法

  ```js
  const EventEmitter = require("events");
  
  /**
   * @description 创建事件控制实例
   */
  const emitter = new EventEmitter();
  
  /**
   * @description 监听事件
   */
  emitter.on("action", (...args) => {
    // [ '向左', '向右' ]
    console.log(args);
  });
  
  /**
   * @description 发射事件
   */
  emitter.emit("action", "向左", "向右");
  
  /**
   * @description 移除监听
   */
  emitter.off("action");
  ```
