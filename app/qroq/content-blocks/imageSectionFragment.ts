import type { Selection } from "groqd";

import { q } from "groqd";

import { imageResponsiveBlockQuery } from "../blocks/image-responsive-query";
import { sectionSettingsBlockQuery } from "../blocks/section-settings-query";
import { stringQuery } from "../blocks/string-query";

export const IMAGE_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageSection'),
  image: imageResponsiveBlockQuery(),
  imageWidthBlock: q.string(),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
