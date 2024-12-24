import { FileNode } from "../../quartz/components/ExplorerNode";
import { QuartzPluginData } from "../../quartz/plugins/vfile";

export const notesFilterForIndex = (file: QuartzPluginData) => {
  if (file.frontmatter && file.frontmatter["disable-index"]) {
    return file.frontmatter["disable-index"] !== 'true'
  }
  return true;
}

export const notesFilter = (file: QuartzPluginData) => {
  return notesFilterForIndex(file);
}

export const topicFilter = (fileNode: FileNode) => {
  if (fileNode.name === "almanac") {
    return false;
  }
  const file = fileNode.file;
  if (file) {
    return notesFilterForIndex(file);
  }
  return true;
}
