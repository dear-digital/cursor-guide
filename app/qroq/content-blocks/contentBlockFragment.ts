import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { headlineBlockQuery } from "../blocks/headlineblock-query";
import { imageResponsiveBlockQuery } from "../blocks/image-responsive-query";
import { linksBlockQuery } from "../blocks/linksblock-query";
import { textBlockQuery } from "../blocks/text-block-query";
import { videoResponsiveBlockQuery } from "../blocks/video-responsive-block-query";

export const CONTENT_BLOCK_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("contentBlockSection"),
  colorTheme: colorThemeBlockQuery(),
  headline: headlineBlockQuery(),
  id: q.string().optional(),
  image: imageResponsiveBlockQuery(),
  imageBlock: imageResponsiveBlockQuery(),
  layout: q.union([
    q.literal('inGrid'),
    q.literal('fullWidth'),
  ]),
  linksBlock: linksBlockQuery(),
  mediaAlignment: q.union([
    q.literal('left'),
    q.literal('right'),
  ]),
  text: textBlockQuery(),
  videoBlock: videoResponsiveBlockQuery(),
}
