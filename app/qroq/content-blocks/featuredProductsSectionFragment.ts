import type {Selection} from 'groqd';

import {q} from 'groqd';

import {booleanQuery} from '../blocks/boolean-query';
import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {getIntValue} from '../utils';

export const FEATURED_PRODUCTS_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('featuredProductsSection'),
  collections: q('collections[]', {isArray: true})
    .deref()
    .grab({
      store: q('store').grab({
        gid: q.string(),
      }),
    })
    .nullable(),
  desktopColumns: numberQuery(),
  maxProducts: numberQuery(),
  settings: sectionSettingsBlockQuery(),
  title: [getIntValue('heading'), stringQuery()],
  viewAll: booleanQuery(),
} satisfies Selection;
