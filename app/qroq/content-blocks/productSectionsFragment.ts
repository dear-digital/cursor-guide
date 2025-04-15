import {q} from 'groqd';

import {CONTENT_BLOCKS_LIST_SELECTION} from './contentBlocks';
import {PRODUCT_INFORMATION_SECTION_FRAGMENT} from './productInformationSectionFragment';
import {RELATED_PRODUCTS_SECTION_FRAGMENT} from './relatedProductsSectionFragment';

export const PRODUCT_SECTIONS_FRAGMENT = q('sections[]', {isArray: true})
  .select({
    "_type == 'productInformationSection'":
      PRODUCT_INFORMATION_SECTION_FRAGMENT,
    "_type == 'relatedProductsSection'": RELATED_PRODUCTS_SECTION_FRAGMENT,
    ...CONTENT_BLOCKS_LIST_SELECTION,
  })
  .nullable();
