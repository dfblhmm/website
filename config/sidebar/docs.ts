import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  front: [
    {
      type: "doc",
      id: "front/index",
      label: "前言"
    },
    // HTML
    {
      type: "doc",
      label: "HTML",
      id: "front/HTML/index"
    },

    // CSS
    {
      type: "category",
      label: "CSS",
      link: {
        type: "doc",
        id: "front/CSS/index"
      },
      items: [
        // CSS 语法
        "front/CSS/core"
      ]
    },

    // JavaScript
    {
      type: "category",
      label: "JavaScript",
      link: {
        type: "doc",
        id: "front/JavaScript/index"
      },
      items: [
        // JavaScript 基础
        "front/JavaScript/basic",
        // JavaScript 进阶
        "front/JavaScript/advance"
      ]
    },

    // 前端工程化
    {
      type: "category",
      label: "前端工程化",
      link: {
        type: "doc",
        id: "front/Font-Engineering/index"
      },
      items: [
        // 包管理工具
        "front/Font-Engineering/package-management-tool",
        // Git
        "front/Font-Engineering/git",

        // 构建工具
        {
          type: "category",
          label: "构建工具",
          link: {
            type: "doc",
            id: "front/Font-Engineering/build-tools/index"
          },
          items: [
            // Webpack
            "front/Font-Engineering/build-tools/webpack"
          ]
        }
      ]
    },

    // 前端框架
    {
      type: "category",
      label: "前端框架",
      link: {
        type: "doc",
        id: "front/Font-Framework/index"
      },
      items: [
        // Vue
        {
          type: "category",
          label: "Vue",
          link: {
            type: "doc",
            id: "front/Font-Framework/Vue/index"
          },
          items: [
            // Vue 核心
            "front/Font-Framework/Vue/core",
            // Vue 路由
            "front/Font-Framework/Vue/router"
          ]
        },
        // React
        {
          type: "category",
          label: "React",
          link: {
            type: "doc",
            id: "front/Font-Framework/React/index"
          },
          items: [
            // React 核心
            "front/Font-Framework/React/core"
          ]
        }
      ]
    },

    // TypeScript
    {
      type: "category",
      label: "TypeScript",
      link: {
        type: "doc",
        id: "front/TypeScript/index"
      },
      items: [
        // TypeScript 核心
        "front/TypeScript/core"
      ]
    },

    // NodeJs
    {
      type: "category",
      label: "NodeJs",
      link: {
        type: "doc",
        id: "front/NodeJs/index"
      },
      items: [
        // NodeJs 基础
        "front/NodeJs/basic",
        // 框架
        {
          type: "category",
          label: "框架",
          link: {
            type: "doc",
            id: "front/NodeJs/framework/index"
          },
          items: [
            // Express
            "front/NodeJs/framework/express"
          ]
        }
      ]
    }
  ],

  "structure-algorithm": [
    {
      type: "doc",
      id: "structure-algorithm/index",
      label: "前言"
    },
    {
      type: "category",
      label: "数据结构",
      link: {
        type: "doc",
        id: "structure-algorithm/data-structure/index"
      },
      items: [
        // 数组
        "structure-algorithm/data-structure/array",

        // 栈
        "structure-algorithm/data-structure/stack",

        // 队列
        "structure-algorithm/data-structure/queue",

        // 链表
        "structure-algorithm/data-structure/linkedList",

        // 哈希表
        "structure-algorithm/data-structure/hashTable"
      ]
    }
  ],

  rust: [
    {
      type: "doc",
      id: "rust/index",
      label: "前言"
    },
    {
      type: "doc",
      id: "rust/rust-basic"
    }
  ]
};

export default sidebars;
