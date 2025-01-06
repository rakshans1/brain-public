import  OGContentMetadata from "../../quartz/components/ContentMeta"
import { QuartzComponentConstructor, QuartzComponentProps } from "../../quartz/components/types"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  function ContentMetadata(props: QuartzComponentProps) {
    const hideMeta = props.fileData.frontmatter?.["hide-meta"]
    if (!hideMeta) {
      return OGContentMetadata(opts)(props)
    } else {
      return null
    }
  }

  return ContentMetadata
}) satisfies QuartzComponentConstructor
