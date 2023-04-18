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
        'web/JavaScript/javaScript-basic',
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
        'web/Font-Engineering/package-management-tool',
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
        'web/Font-Framework/Vue'
      ]
    }
  ]
};

export = sidebars;
