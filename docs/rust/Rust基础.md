---
id: rust-basic
title: Rust 基础
---
# Rust 基础

## 认识 Rust

### 定义和特点

- **Rust** 是一种==多范式==、==高级==、==通用==、==编译型==的编程语言
- Rust 强调性能、类型安全和并发性
- Rust 强制==内存安全==，所有引用都指向==有效内存==
- 无 GC，且无需手动管理内存

- 支持函数式、并发式、过程式等程序设计风格
- Rust 具备非常优秀的性能，和 C/C++ 是一个级别



### 发展历史

- 2006年，Rust 作为 Graydon Hoare 的个人项目首次出现
- 2010年，Rust 首次作为 Mozilla 官方项目出现
  - 同年，最初用 OCaml 编写的编译器转移到基于用 Rust 编写的LLVM 自托管编译器
  - 新的 Rust 编译器在 2011 年成功编译了自己
- 2015 年 5 月 15 日，第一个稳定版本 Rust 1.0 发布
- 2021 年 2 月 8 日，Rust 基金会由其五家创始公司（AWS、华为、谷歌、微软和 Mozilla）宣布成立
- 2022 年 12 月，Rust 成为继 C 语言之后第二个支持 Linux 内核开发的高级语言



### 应用场景

- ==命令行工具==：使用 Rust 可以直接生成可执行文件，无需二次解释
- ==WebAssembly== 开发；JS 基础设施建设，如 Deno
- ==系统开发==：目前 Linux 已经将 Rust 语言纳入内核
- ==操作系统开发==，如谷歌的 Fuchsia
- ==区块链==、==嵌入式==开发
