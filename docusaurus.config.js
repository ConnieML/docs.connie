// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { github: lightCodeTheme, dracula: darkCodeTheme } = require("prism-react-renderer").themes;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Connie Documentation",
  tagline: "Connie Professional Services",
  favicon: "img/logos/connie-rtc-icon.png",

  // Set the production url of your site here
  url: "https://docs.connie.one",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domains, this is usually just '/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ConnieML", // Usually your GitHub org/user name.
  projectName: "docs.connie", // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
          //docsRouteBaseBath: "/",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        toExtensions: ["html"],
      },
    ],
    'docusaurus-plugin-sass'
  ],
  
  stylesheets: [
    // Note: Consider replacing with Connie-specific fonts if available
    'https://assets.twilio.com/public_assets/paste-fonts/1.5.1/fonts.css',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Connie Documentation",
        logo: {
          alt: "Connie Logo",
          src: "img/logos/connie-rtc-icon.png",
        },
        items: [
          {
            href: "https://github.com/ConnieML/docs.connie",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Connie Links",
            items: [
              {
                label: "Learn More",
                href: "https://connie.one",
              },
              {
                label: "Log In",
                href: "https://portal.connie.team",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/ConnieML/docs.connie",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Connie Corp.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // Index all docs for search
        indexDocs: true,
        indexDocSidebarParentCategories: 0,
        indexBlog: false,
        indexPages: false,
        language: "en",
        style: undefined,
        maxSearchResults: 8,
        // Lunr.js search engine configuration
        lunr: {
          tokenizerSeparator: /[\s\-]+/,
          b: 0.75,              // Length normalization
          k1: 1.2,              // Term frequency saturation
          titleBoost: 5,        // Boost title matches
          contentBoost: 1,      // Normal content weight
          tagsBoost: 3,         // Boost tag matches
          parentCategoriesBoost: 2  // Boost parent category matches
        }
      }
    ]
  ],
    // In order for Mermaid code blocks in Markdown to work,
    // you also need to enable the Remark plugin with this option
    markdown: {
      mermaid: true,
    },
};

module.exports = config;
