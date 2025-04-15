import {q} from 'groqd';

import {IMAGE_FRAGMENT} from '../fragments';
import {aspectRatioPartialQuery} from './partial/aspect-ratio-query';

export function imageBlockQuery(name = 'imageBlock') {
  return q(name)
    .grab({
      lg: q('').grab({
        image: q('asset').grab(IMAGE_FRAGMENT),
        ratio: aspectRatioPartialQuery(),
      }),
      sm: q('').grab({
        image: q('asset').grab(IMAGE_FRAGMENT),
        ratio: aspectRatioPartialQuery(),
      }),
    })
    .nullable();
}
