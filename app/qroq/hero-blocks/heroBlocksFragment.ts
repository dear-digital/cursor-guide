import {q} from 'groqd';

import {HERO_BLOCKS_LIST_SELECTION} from '../heroBlocks';

export const HERO_BLOCKS_FRAGMENT = q('heroBlocks[]', {isArray: true})
  .select(HERO_BLOCKS_LIST_SELECTION)
  .nullable();
