import type {Selection} from 'groqd';

import {q} from 'groqd';

import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';

export const FEATURED_COLLECTIONS_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('featuredCollections'),
  collections: q('collections[]', {isArray: true})
    .deref()
    .grab({
      store: q('store').grab({
        gid: q.string(),
      }),
    })
    .nullable(),
  desktopColumns: numberQuery(),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
