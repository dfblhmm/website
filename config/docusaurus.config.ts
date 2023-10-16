import { resolve } from 'path';
import lightCodeTheme from 'prism-react-renderer/themes/github';
import darkCodeTheme from 'prism-react-renderer/themes/dracula';

import { Config } from '@docusaurus/types';
import { Options, ThemeConfig } from '@docusaurus/preset-classic';

import { transformImg, transformMark } from './plugins';
import { getSidebarData } from './sidebar';

const classicPresetConfig: Options = {
  docs: {
    // showLastUpdateTime: true,
    sidebarPath: resolve(__dirname, './sidebar/docs.ts'),
    remarkPlugins: [transformImg, transformMark]
    // editUrl: '',
  },
  blog: {
    showReadingTime: true
    // editUrl: '',
  },
  theme: {
    customCss: [
      require.resolve('../src/style/global.scss'),
      require.resolve('../src/style/docusaurus.scss'),
      require.resolve('../src/style/markdown.scss')
    ]
  }
};

const themeConfig: ThemeConfig = {
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 4
  },

  navbar: {
    title: '不系之舟',
    logo: {
      alt: '不系之舟',
      src: '/images/logo.png',
    },
    items: [
      {
        type: 'docSidebar',
        sidebarId: 'front',
        position: 'left',
        label: '前端',
      },
      {
        type: 'docSidebar',
        sidebarId: 'rust',
        position: 'left',
        label: 'Rust'
      }
      // { to: '/blog', label: 'Blog', position: 'left' },
      // {
      //   href: 'https://github.com/facebook/docusaurus',
      //   label: 'GitHub',
      //   position: 'right',
      // },
    ]
  },

  prism: {
    theme: lightCodeTheme,
    darkTheme: darkCodeTheme,
    additionalLanguages: [
      'bash',
      'rust'
    ]
  }
};

const config: Config = {
  title: '不系之舟泛若舟',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  staticDirectories: [
    'public',
    'docs/front/images',
    'docs/front/01_HTML/images',
    'docs/front/02_CSS/images',
    'docs/front/03_JavaScript/images',
    'docs/front/04_Font-Engineering/images',
    'docs/front/05_Font-Framework/Vue/images',
    'docs/front/05_Font-Framework/React/images',
    'docs/front/06_TypeScript/images',
    'docs/front/08_NodeJs/images',

    'docs/rust/images'
  ],

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },

  presets: [
    ['classic', classicPresetConfig]
  ],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig,

  /**
   * 自定义的元数据
   */
  customFields: {
    sidebarOptions: {
      front: getSidebarData('docs').front
    }
  }
};

export = config;
