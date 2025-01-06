import { FilePath, FullSlug } from "../../quartz/util/path"

export * from "./transformers"
export * from "./emitters"

declare module "vfile" {
  // inserted in processors.ts
  interface DataMap {
    slug: FullSlug
    filePath: FilePath
    relativePath: FilePath
  }
}
