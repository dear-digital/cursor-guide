import {q} from 'groqd';

import {CONTENT_BLOCKS_LIST_SELECTION} from './contentBlocks';

export const CONTENT_BLOCKS_FRAGMENT = q('contentBlocks[]', {isArray: true})
  .select(CONTENT_BLOCKS_LIST_SELECTION)
  .nullable();
