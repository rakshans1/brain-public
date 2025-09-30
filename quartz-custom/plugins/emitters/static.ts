import fs from "fs"
import { joinSegments } from "../../../quartz/util/path"
import { QuartzEmitterPlugin } from "../../../quartz/plugins/types"
import { FilePath } from "../../../quartz/util/path"
import { glob } from "../../../quartz/util/glob"
import { QUARTZ_CUSTOM } from "../../utils/path"
import { dirname } from "path"

export const Static: QuartzEmitterPlugin = () => ({
  name: "CustomStatic",
  async *emit({ argv, cfg }) {
    const staticPath = joinSegments(QUARTZ_CUSTOM, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    const outputStaticPath = joinSegments(argv.output, "static")
    await fs.promises.mkdir(outputStaticPath, { recursive: true })
    for (const fp of fps) {
      const src = joinSegments(staticPath, fp) as FilePath
      const dest = joinSegments(outputStaticPath, fp) as FilePath
      await fs.promises.mkdir(dirname(dest), { recursive: true })
      await fs.promises.copyFile(src, dest)
      yield dest
    }
  },
  async *partialEmit() {},
})
