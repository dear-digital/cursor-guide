import {q} from 'groqd';

import {COLLECTION_BANNER_SECTION_FRAGMENT} from './collectionBannerSectionFragment';
import {COLLECTION_PRODUCT_GRID_SECTION_FRAGMENT} from './collectionProductGridSectionFragment';
import {CONTENT_BLOCKS_LIST_SELECTION} from './contentBlocks';

export const COLLECTION_SECTIONS_FRAGMENT = q('sections[]', {isArray: true})
  .select({
    "_type == 'collectionBannerSection'": COLLECTION_BANNER_SECTION_FRAGMENT,
    "_type == 'collectionProductGridSection'":
      COLLECTION_PRODUCT_GRID_SECTION_FRAGMENT,
    ...CONTENT_BLOCKS_LIST_SELECTION,
  })
  .nullable();
