import { resolve } from "path";
import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import { transformImg, transformMark, getSidebarData, getStaticDirectories } from "./config";

const classicPresetConfig: Preset.Options = {
  docs: {
    showLastUpdateTime: true,
    sidebarPath: resolve(__dirname, "./config/sidebar/docs.ts"),
    remarkPlugins: [transformImg, transformMark]
    // editUrl: '',
  },
  blog: {
    showReadingTime: true
    // editUrl: '',
  },
  theme: {
    customCss: [
      require.resolve("./src/style/global.scss"),
      require.resolve("./src/style/docusaurus.scss"),
      require.resolve("./src/style/markdown.scss")
    ]
  }
};

const themeConfig: Preset.ThemeConfig = {
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 4
  },

  navbar: {
    title: "不系之舟",
    logo: {
      alt: "不系之舟",
      src: "/images/logo.png"
    },
    items: [
      {
        type: "docSidebar",
        sidebarId: "front",
        position: "left",
        label: "前端"
      },
      {
        type: "docSidebar",
        sidebarId: "rust",
        position: "left",
        label: "Rust"
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
    theme: themes.github,
    darkTheme: themes.dracula,
    additionalLanguages: ["bash", "json", "rust", "nginx"]
  }
};

const config: Config = {
  title: "不系之舟泛若舟",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  staticDirectories: [
    "public",
    ...getStaticDirectories(resolve(__dirname, "./docs"), {
      type: "folder",
      name: "images"
    })
  ],

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"]
  },

  presets: [["classic", classicPresetConfig]],

  plugins: [
    "docusaurus-plugin-sass"
    // () => ({
    //   name: "webpack",
    //   configureWebpack() {
    //     return {
    //       cache: false
    //     };
    //   }
    // })
  ],

  themeConfig,

  /**
   * 自定义的元数据
   */
  customFields: {
    sidebarOptions: {
      front: getSidebarData("docs").front
    }
  }
};

export default config;
