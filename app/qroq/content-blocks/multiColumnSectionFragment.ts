import type { Selection } from 'groqd';

import { q } from 'groqd';

import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { stringQuery } from '../blocks/string-query';
import { getIntValue } from '../utils';

export const MULTI_COLUMN_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('multiColumnSection'),
  headline: headlineBlockQuery(),
  multiColumnCards: q('multiColumnCards[]', {isArray: true}).grab({
    icon: q.string().optional(),
    image: imageResponsiveBlockQuery('multiColumnImage'),
    link: linkBlockQuery('multiColumnLink'),
    smallImage: q.boolean().optional(),
    text: [getIntValue('multiColumnText'), stringQuery()],
    title: [getIntValue('multiColumnTitle'), stringQuery()],
  }),
} satisfies Selection;
