import  OGContentMetadata from "../../quartz/components/ContentMeta"
import { QuartzComponentConstructor, QuartzComponentProps } from "../../quartz/components/types"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  function ContentMetadata({ fileData }: QuartzComponentProps) {
    const hideMeta = fileData.frontmatter?.["hide-meta"]
    const text = fileData.text

    if (text && !hideMeta) {
      return <OGContentMetadata {...opts} />
    } else {
      return null
    }
  }

  return ContentMetadata
}) satisfies QuartzComponentConstructor
