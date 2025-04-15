import { q, z } from 'groqd';
import { contentAlignmentValues } from '~/lib/utilities/contentAlignment';

export function contentAlignmentResponsiveBlockQuery(
  name = 'contentAlignment',
) {
  return q(name)
    .grab({
      sm: q('sm')
        .grab({
          horizontalAlignment: z.enum(contentAlignmentValues),
          verticalAlignment: z.enum(contentAlignmentValues),
        })
        .nullable(),
      lg: q('lg')
        .grab({
          horizontalAlignment: z.enum(contentAlignmentValues),
          verticalAlignment: z.enum(contentAlignmentValues),
        })
        .nullable(),
    })
    .nullable();
}
