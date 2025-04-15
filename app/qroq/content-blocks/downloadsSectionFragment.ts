import type {Selection} from 'groqd';

import {q} from 'groqd';

import {titleBlockQuery} from '../blocks/title-query';

export const DOWNLOADS_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal('downloadsSection'),
  id: q.string().optional(),
  title: titleBlockQuery(),
} satisfies Selection;
