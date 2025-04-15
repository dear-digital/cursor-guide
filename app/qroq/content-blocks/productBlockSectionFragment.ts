import type { Selection } from 'groqd';

import { q } from 'groqd';

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { stringQuery } from '../blocks/string-query';

export const PRODUCT_BLOCK_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('productBlockSection'),
  colorTheme: colorThemeBlockQuery(),
  headline: headlineBlockQuery(),
  image: imageResponsiveBlockQuery(),
  linkBlock: linkBlockQuery(),
  subtitle: q(
    `coalesce(
      subtitle[_key == $language][0].value,
      subtitle[_key == $defaultLanguage][0].value
    )`
  ).nullable(),
  title: q(
    `coalesce(
      title[_key == $language][0].value,
      title[_key == $defaultLanguage][0].value
    )`
  ).nullable(),
} satisfies Selection;
