import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { RemoveTags } from "./quartz-custom/plugins/transformers/removeTags"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🧠",
    pageTitleSuffix: " | 🧠",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-9NPSJFJHEQ"
    },
    locale: "en-US",
    baseUrl: "brain.rakshanshetty.in",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#e8e9ec",
          lightgray: "#c6c8d1",
          gray: "#9198b9",
          darkgray: "#6b7089",
          dark: "#161821",
          secondary: "hsl(215 37% 40%)",
          tertiary: "#89b8c2",
          highlight: "rgba(132, 160, 198, 0.30)",
          textHighlight: "#e2a47888",
        },
        darkMode: {
          light: "#161821",
          lightgray: "#2e3244",
          gray: "#6b7089",
          darkgray: "#c6c8d1",
          dark: "#e8e9ec",
          secondary: "#84a0c6",
          tertiary: "#89b8c2",
          highlight: "rgba(192, 202, 245, 0.15)",
          textHighlight: "#e2a47888",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      RemoveTags({ tags: ["publish", "almanac"] }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssFullHtml: false,
        includeEmptyFiles: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
