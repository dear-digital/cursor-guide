import {q} from 'groqd';

import {VIDEO_FRAGMENT} from '../fragments';
import {aspectRatioPartialQuery} from './partial/aspect-ratio-query';

export function videoResponsiveBlockQuery(name = 'videoBlock') {
  return q(name)
    .grab({
      autoPlay: q.boolean().nullable(),
      lg: q(
        `coalesce(
          lg,
          sm
        )`,
      ).grab({
        externalUrl: q.string().nullable(),
        ratio: aspectRatioPartialQuery(),
        video: q('asset').grab(VIDEO_FRAGMENT),
        youtubeUrl: q.string().nullable(),
      }),
      sm: q('sm').grab({
        externalUrl: q.string().nullable(),
        ratio: aspectRatioPartialQuery(),
        video: q('asset').grab(VIDEO_FRAGMENT),
        youtubeUrl: q.string().nullable(),
      }),
    })
    .nullable();
}
