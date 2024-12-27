import { FilePath, FullSlug } from "../../quartz/util/path"

export * from "./transformers"

declare module "vfile" {
  // inserted in processors.ts
  interface DataMap {
    slug: FullSlug
    filePath: FilePath
    relativePath: FilePath
  }
}
