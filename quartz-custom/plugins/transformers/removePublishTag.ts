import { QuartzTransformerPlugin } from "../../../quartz/plugins/types"

export const RemovePublishTag: QuartzTransformerPlugin = () => {
  return {
    name: "RemovePublishTag",
    markdownPlugins() {
      return [
        () => {
          return (_tree, file) => {
            if (file.data.frontmatter && file.data.frontmatter.tags) {
              file.data.frontmatter.tags = file.data.frontmatter.tags.filter(tag => tag !== 'publish')
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    wordcount: number
  }
}