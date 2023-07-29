import { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  web: [
    {
      type: 'doc',
      id: 'web/index',
      label: '前言'
    },
    // HTML
    {
      type: 'doc',
      label: 'HTML',
      id: 'web/HTML/HTML'
    },

    // CSS
    {
      type: 'category',
      label: 'CSS',
      link: {
        type: 'doc',
        id: 'web/CSS/index'
      },
      items: [
        // CSS 语法
        'web/CSS/CSS'
      ]
    },

    // JavaScript
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'web/JavaScript/index'
      },
      items: [
        // JavaScript 基础
        'web/JavaScript/javaScript-basic',
        // JavaScript 进阶
        'web/JavaScript/javaScript-advance'
      ]
    },

    // 前端工程化
    {
      type: 'category',
      label: '前端工程化',
      link: {
        type: 'doc',
        id: 'web/Font-Engineering/index'
      },
      items: [
        // 包管理工具
        'web/Font-Engineering/package-management-tool',
        // Git
        'web/Font-Engineering/Git'
      ]
    },

    // 前端框架
    {
      type: 'category',
      label: '前端框架',
      link: {
        type: 'doc',
        id: 'web/Font-Framework/index'
      },
      items: [
        // Vue
        {
          type: 'category',
          label: 'Vue',
          link: {
            type: 'doc',
            id: 'web/Font-Framework/Vue/index'
          },
          items: [
            // Vue 核心
            'web/Font-Framework/Vue/vue-core',
            // Vue 路由
            'web/Font-Framework/Vue/vue-router',
          ]
        },
        // React
        {
          type: 'category',
          label: 'React',
          link: {
            type: 'doc',
            id: 'web/Font-Framework/React/index'
          },
          items: [
            // React 核心
            'web/Font-Framework/React/react-core'
          ]
        }
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
