import { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  front: [
    {
      type: 'doc',
      id: 'front/index',
      label: '前言'
    },
    // HTML
    {
      type: 'doc',
      label: 'HTML',
      id: 'front/HTML/HTML'
    },

    // CSS
    {
      type: 'category',
      label: 'CSS',
      link: {
        type: 'doc',
        id: 'front/CSS/index'
      },
      items: [
        // CSS 语法
        'front/CSS/CSS'
      ]
    },

    // JavaScript
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'front/JavaScript/index'
      },
      items: [
        // JavaScript 基础
        'front/JavaScript/javaScript-basic',
        // JavaScript 进阶
        'front/JavaScript/javaScript-advance'
      ]
    },

    // 前端工程化
    {
      type: 'category',
      label: '前端工程化',
      link: {
        type: 'doc',
        id: 'front/Font-Engineering/index'
      },
      items: [
        // 包管理工具
        'front/Font-Engineering/package-management-tool',
        // Git
        'front/Font-Engineering/Git'
      ]
    },

    // 前端框架
    {
      type: 'category',
      label: '前端框架',
      link: {
        type: 'doc',
        id: 'front/Font-Framework/index'
      },
      items: [
        // Vue
        {
          type: 'category',
          label: 'Vue',
          link: {
            type: 'doc',
            id: 'front/Font-Framework/Vue/index'
          },
          items: [
            // Vue 核心
            'front/Font-Framework/Vue/vue-core',
            // Vue 路由
            'front/Font-Framework/Vue/vue-router',
          ]
        },
        // React
        {
          type: 'category',
          label: 'React',
          link: {
            type: 'doc',
            id: 'front/Font-Framework/React/index'
          },
          items: [
            // React 核心
            'front/Font-Framework/React/react-core'
          ]
        }
      ]
    },

    // TypeScript 
    {
      type: 'category',
      label: 'TypeScript',
      link: {
        type: 'doc',
        id: 'front/TypeScript/index'
      },
      items: [
        // TypeScript 核心
        'front/TypeScript/ts-core'
      ]
    },

    // NodeJs 
    {
      type: 'category',
      label: 'NodeJs',
      link: {
        type: 'doc',
        id: 'front/NodeJs/index'
      },
      items: [
        // NodeJs 基础
        'front/NodeJs/node-basic'
      ]
    }
  ],

  rust: [
    {
      type: 'doc',
      id: 'rust/index',
      label: '前言'
    },
    {
      type: 'doc',
      id: 'rust/rust-basic'
    }
  ]
};

export = sidebars;