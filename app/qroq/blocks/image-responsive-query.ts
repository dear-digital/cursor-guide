import {q} from 'groqd';

import {IMAGE_FRAGMENT} from '../fragments';
import {aspectRatioPartialQuery} from './partial/aspect-ratio-query';

export function imageResponsiveBlockQuery(name = 'imageBlock') {
  return q(name)
    .grab({
      lg: q(
        `coalesce(
          lg,
          sm
        )`,
      ).grab({
        image: q('asset').grab(IMAGE_FRAGMENT),
        ratio: aspectRatioPartialQuery(),
      }),
      sm: q('sm').grab({
        image: q('asset').grab(IMAGE_FRAGMENT),
        ratio: aspectRatioPartialQuery(),
      }),
    })
    .nullable();
}
