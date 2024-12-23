import { QuartzPluginData } from "../../quartz/plugins/vfile";

export const indexFilter = (file: QuartzPluginData) => {
  if (file.frontmatter && file.frontmatter.index) {
    return file.frontmatter.index !== 'true'
  }
  return true;
}
