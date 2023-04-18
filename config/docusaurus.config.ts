import lightCodeTheme from 'prism-react-renderer/themes/github';
import darkCodeTheme from 'prism-react-renderer/themes/dracula';

import { Config } from '@docusaurus/types';
import { Options, ThemeConfig } from '@docusaurus/preset-classic';

import { transformImg, transformMark } from './plugins/index';

const classicPresetConfig: Options = {
  docs: {
    sidebarPath: require.resolve('./sidebars.ts'),
    remarkPlugins: [transformImg, transformMark]
    // editUrl: '',
  },
  blog: {
    showReadingTime: true
    // editUrl: '',
  },
  theme: {
    customCss: require.resolve('../src/style/custom.scss'),
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
        sidebarId: 'web',
        position: 'left',
        label: 'Web 前端',
      },
      // { to: '/blog', label: 'Blog', position: 'left' },
      // {
      //   href: 'https://github.com/facebook/docusaurus',
      //   label: 'GitHub',
      //   position: 'right',
      // },
    ]
  },

  // footer: {
  //   style: 'dark',
  //   links: [
  //     {
  //       title: 'Docs',
  //       items: [
  //         {
  //           label: 'Tutorial',
  //           to: '/docs/intro',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Community',
  //       items: [
  //         {
  //           label: 'Stack Overflow',
  //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
  //         },
  //         {
  //           label: 'Discord',
  //           href: 'https://discordapp.com/invite/docusaurus',
  //         },
  //         {
  //           label: 'Twitter',
  //           href: 'https://twitter.com/docusaurus',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'More',
  //       items: [
  //         {
  //           label: 'Blog',
  //           to: '/blog',
  //         },
  //         {
  //           label: 'GitHub',
  //           href: 'https://github.com/facebook/docusaurus',
  //         },
  //       ],
  //     },
  //   ],
  //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
  // },

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
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  staticDirectories: [
    'public',
    'docs/web/01_HTML/images',
    'docs/web/02_CSS/images',
    'docs/web/03_JavaScript/images',
    'docs/web/04_Font-Engineering/images',
    'docs/web/05_Font-Framework/images'
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

  themeConfig
};

export = config;
