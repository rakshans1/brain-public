import { QuartzPluginData } from "../../quartz/plugins/vfile";

export const indexFilter = (file: QuartzPluginData) => {
  if (file.frontmatter && file.frontmatter.tags) {
    return !file.frontmatter.tags.includes("index")
  }
  return true;
}
