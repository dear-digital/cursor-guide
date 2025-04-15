import type { Selection } from 'groqd';

import { q } from "groqd";

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { stringQuery } from "../blocks/string-query";
import { textBlockQuery } from "../blocks/text-block-query";

export const MEDIA_CONTAINER_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('mediaContainerSection'),
  autoplay: q.boolean().optional(),
  colorTheme: colorThemeBlockQuery(),
  headline: headlineBlockQuery(),
  imageLocalized: q(
    `coalesce(
      imageLocalized[_key == $language][0],
      imageLocalized[_key == $defaultLanguage][0]
    )`
  ).nullable(),
  text: textBlockQuery('mediaContainerText'),
  videoLocalized: q(
    `coalesce(
      videoLocalized[_key == $language][0],
      videoLocalized[_key == $defaultLanguage][0]
    )`
  ).nullable(),
} satisfies Selection;
