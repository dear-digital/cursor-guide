import type { Selection } from 'groqd';

import { q } from 'groqd';

import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { eyecatcherQuery } from '../blocks/partial/eyecatcher-query';
import { stringQuery } from '../blocks/string-query';
import { titleBlockQuery } from '../blocks/title-query';
import { getIntValue } from '../utils';

export const FEATURED_CARDS_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('featuredCardsSection'),
  textImageCards: q('textImageCards[]', {isArray: true}).grab({
    cardType: q.string().nullable(),
    eyecatcher: eyecatcherQuery('eyecatcher'),
    image: imageResponsiveBlockQuery('image'),
    link: linkBlockQuery(),
    title: [getIntValue('title'), stringQuery()],
  }),
  title: titleBlockQuery(),
} satisfies Selection;
