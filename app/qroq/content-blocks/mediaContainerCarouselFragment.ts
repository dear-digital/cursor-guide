import type { Selection } from 'groqd';

import { q } from "groqd";

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { stringQuery } from "../blocks/string-query";
import { textBlockQuery } from "../blocks/text-block-query";

export const MEDIA_CONTAINER_CAROUSEL_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('mediaContainerCarouselSection'),
  colorTheme: colorThemeBlockQuery(),
  content: contentQuery(),
  headline: headlineBlockQuery(),
} satisfies Selection;

export function contentQuery() {
  return q("content")
    .filter()
    .grab({
      // autoplay boolean
      autoplay: q.boolean().optional(),
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
    });
}
