import type {Selection} from 'groqd';

import {q, z} from 'groqd';

import {contentAlignmentValues} from '~/lib/utilities/contentAlignment';
import {contentPositionValues} from '~/lib/utilities/contentPosition';

import {booleanQuery} from '../blocks/boolean-query';
import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';

export const COLLECTION_BANNER_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('collectionBannerSection'),
  bannerHeight: numberQuery(),
  contentAlignment: z.enum(contentAlignmentValues).nullable(),
  contentPosition: z.enum(contentPositionValues).nullable(),
  overlayOpacity: numberQuery(),
  settings: sectionSettingsBlockQuery(),
  showDescription: booleanQuery(),
  showImage: booleanQuery(),
} satisfies Selection;
