import type {Selection} from 'groqd';

import {q} from 'groqd';

import { booleanQuery } from '../blocks/boolean-query';
import { numberQuery } from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { titleBlockQuery } from '../blocks/title-query';

export const COLLECTION_PRODUCT_GRID_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('collectionProductGridSection'),
  desktopColumns: numberQuery(),
  enableFiltering: booleanQuery(),
  enableSorting: booleanQuery(),
  mobileColumns: numberQuery(),
  productsPerPage: numberQuery(),
  settings: sectionSettingsBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
