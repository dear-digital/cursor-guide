import type { Selection } from 'groqd';

import { q } from "groqd";

import { textBlockQuery } from "../blocks/text-block-query";

export const MEDIA_CONTAINER_CONTENT_FRAGMENT = {
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
