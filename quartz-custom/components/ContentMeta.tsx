import  OGContentMetadata from "../../quartz/components/ContentMeta"
import { QuartzComponentConstructor, QuartzComponentProps } from "../../quartz/components/types"
import style from "../../quartz/components/styles/contentMeta.scss"

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

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
