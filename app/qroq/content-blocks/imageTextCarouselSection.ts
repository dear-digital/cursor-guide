import type { Selection } from 'groqd';

import { q } from 'groqd';

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { stringQuery } from '../blocks/string-query';
import { titleBlockQuery } from '../blocks/title-query';

export const IMAGE_TEXT_CAROUSEL_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageTextCarouselSection'),
  colorTheme: colorThemeBlockQuery(),
  images: q.array(
    q.object({
      asset: q
        .object({
          _ref: q.string(),
          _type: q.literal('reference'),
        })
        .optional(),
      name: q.string().optional(),
      ratio: q
        .object({
          height: q.number().optional(),
          width: q.number().optional(),
        })
        .optional(),
    }),
  ),
  titleBlockQuery: titleBlockQuery('headline'),
} satisfies Selection;
