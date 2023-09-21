---
id: ts-core
title: 核心
---

# TypeScript

## 认识 TypeScript

### 类型缺失的 JavaScript

- 其实上由于各种历史因素，JavaScript 语言本身存在很多的缺点

  - 随着 ECMAScript 不断提出的新特性，让这门语言更加现代、更加安全、更加方便
  - 然而到目前为止，JavaScript 在==类型检测==上依然是毫无进展

- 缺失类型带来的问题

  <img src="./images/image-20230921224923974.png" alt="image-20230921224923974" style="zoom: 67%;" />

  - 无法在==代码编译期间==就发现代码错误，许多错误必须要等到==代码执行==时才能发现
  - 对于工具/框架的开发者，无法给使用者提供==类型提示==，还需要对各种==错误边界==进行处理
  - 尤其是对于 JavaScript 这一单线程语言而言，错误会导致后续的代码都无法执行

- 为了弥补 JavaScript 类型约束上的缺陷，很多公司推出了自己的方案
  - 2014 年，Facebook 推出了 ==flow== 来对 JavaScript 进行类型检查
  - 同年，Microsoft 也推出了 ==TypeScript== 1.0 版本
  - 目前，TypeScript 已经成为了最为流行的 JavaScript 超集

### TypeScript 定义和特点

> 定义

<img src="./images/image-20230921230239701.png" alt="image-20230921230239701" style="zoom:50%;" />

- 官方定义：TypeScript is **JavaScript with syntax for types**
- TypeScript 是拥有==类型==的 JavaScript ==超集==

> 特点

- 始于 JavaScript，归于 JavaScript

  - 基于 JavaScript 进行构建，包含 JavaScript 的所有语法特性
  - 可以编译成==普通==、==干净==、==完整==的 JavaScript 代码

- 拥有先进的 JavaScript

  - 包含 ECMAScript 和 ==未来提案== 中的特性
  - 对原有的 JavaScript 进行了==语法扩展==，同时也可以编译成==向下兼容==的代码

- 是一个强大的工具，用于构建大型项目
  - ==静态语法分析==可以实时分析代码错误
  - 类型是可选的，强大的==类型推导==能力

### TypeScript 运行环境

- 方案一：使用 `ts-node` 工具（Node.js 环境）

  ```shell
  # 对于 ts-node 工具包，全局安装即可
  npm i -g ts-node tslib @types/node
  # 运行 ts 文件
  ts-node index.ts
  ```

- 方案二：使用 `webpack` 搭建环境（浏览器环境）

  ```typescript
  import { resolve } from "path";
  import { Configuration } from "webpack";
  import HtmlWebpackPlugin from "html-webpack-plugin";

  const config: Configuration = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "./build")
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader"
        }
      ]
    },
    resolve: {
      extensions: [".ts", "..."]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "./index.html")
      })
    ]
  };

  export default config;
  ```

## 变量声明
