import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { imageResponsiveBlockQuery } from "../blocks/image-responsive-query";
import { stringQuery } from "../blocks/string-query";
import { titleBlockQuery } from "../blocks/title-query";

export const FULL_WIDTH_IMAGE_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageSection'),
  btnText: q(
    `coalesce(
      btnText[_key == $language][0].value,
      btnText[_key == $defaultLanguage][0].value
    )`
  ).nullable(),
  colorTheme: colorThemeBlockQuery(),
  headline: titleBlockQuery('headline'),
  image: imageResponsiveBlockQuery(),
  roundedCorners: q.boolean(),
} satisfies Selection;
