// // @ts-check

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// // const transform = require('./utils/plugins/transform');

// /** @type {import('@docusaurus/types').Config} */
// const config = {
//   title: 'My Site',
//   tagline: 'Dinosaurs are cool',
//   favicon: 'img/favicon.ico',

//   staticDirectories: [
//     'public', 
//     'docs/JavaScript/images'
//   ],

//   // Set the production url of your site here
//   url: 'https://your-docusaurus-test-site.com',
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: '/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'facebook', // Usually your GitHub org/user name.
//   projectName: 'docusaurus', // Usually your repo name.

//   onBrokenLinks: 'throw',
//   onBrokenMarkdownLinks: 'warn',

//   i18n: {
//     defaultLocale: 'zh-Hans',
//     locales: ['zh-Hans'],
//   },

//   presets: [
//     [
//       'classic',
//       /** @type {import('@docusaurus/preset-classic').Options} */
//       ({
        
//         docs: {
//           sidebarPath: require.resolve('./ss.js'),
//           // remarkPlugins: [transform]
//           // routeBasePath: '/docs'
//           // editUrl: '',
//         },
//         blog: {
//           showReadingTime: true,
//           // editUrl: '',
//         },
//         // theme: {
//         //   customCss: require.resolve('./src/style/custom.scss'),
//         // }
//       })
//     ]
//   ],

//   plugins: ['docusaurus-plugin-sass'],

//   themeConfig:
//     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
//     ({
//       // Replace with your project's social card
//       // image: 'img/docusaurus-social-card.jpg',
//       // navbar: {
//       //   title: 'My Site',
//       //   logo: {
//       //     alt: 'My Site Logo',
//       //     src: 'img/logo.svg',
//       //   },
//       //   items: [
//       //     {
//       //       type: 'docSidebar',
//       //       sidebarId: 'tutorialSidebar',
//       //       position: 'left',
//       //       label: 'Tutorial',
//       //     },
//       //     {to: '/blog', label: 'Blog', position: 'left'},
//       //     {
//       //       href: 'https://github.com/facebook/docusaurus',
//       //       label: 'GitHub',
//       //       position: 'right',
//       //     },
//       //   ],
//       // },
//       // footer: {
//       //   style: 'dark',
//       //   links: [
//       //     {
//       //       title: 'Docs',
//       //       items: [
//       //         {
//       //           label: 'Tutorial',
//       //           to: '/docs/intro',
//       //         },
//       //       ],
//       //     },
//       //     {
//       //       title: 'Community',
//       //       items: [
//       //         {
//       //           label: 'Stack Overflow',
//       //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
//       //         },
//       //         {
//       //           label: 'Discord',
//       //           href: 'https://discordapp.com/invite/docusaurus',
//       //         },
//       //         {
//       //           label: 'Twitter',
//       //           href: 'https://twitter.com/docusaurus',
//       //         },
//       //       ],
//       //     },
//       //     {
//       //       title: 'More',
//       //       items: [
//       //         {
//       //           label: 'Blog',
//       //           to: '/blog',
//       //         },
//       //         {
//       //           label: 'GitHub',
//       //           href: 'https://github.com/facebook/docusaurus',
//       //         },
//       //       ],
//       //     },
//       //   ],
//       //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
//       // },
//       prism: {
//         theme: lightCodeTheme,
//         darkTheme: darkCodeTheme,
//         additionalLanguages: [
//           'bash',
//           'rust'
//         ]
//       }
//     })
// };

// module.exports = config;

'use strict';

require('ts-node').register({
  scope: true,
  scopeDir: __dirname,
  transpileOnly: true,
});

module.exports = require('./config/docusaurus.config');