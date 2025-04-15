import { q, z } from 'groqd';

import { ASPECT_RATIOS } from '~/lib/constants/aspect-ratios';

export function aspectRatioPartialQuery(name = 'ratio') {
  return q(name)
    .grabOne('ratio', z.enum(ASPECT_RATIOS).default('1:1'));
}
