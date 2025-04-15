import type {Selection} from 'groqd';

import {q} from 'groqd';

import {linkBlockQuery} from '../blocks/linkblock-query';
import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {titleBlockQuery} from '../blocks/title-query';
import {getIntValue} from '../utils';

export const RELATED_PRODUCTS_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('relatedProductsSection'),
  description: [getIntValue('description'), stringQuery()],
  link: linkBlockQuery(),
  maxProducts: numberQuery(),
  settings: sectionSettingsBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
