import {q, z} from 'groqd';
import {contentAlignmentValues} from '~/lib/utilities/contentAlignment';

export function contentAlignmentHorizontalResponsiveBlockQuery(
  name = 'contentAlignment',
) {
  return q(name)
    .grab({
      sm: q('sm')
        .grab({
          horizontal: z.enum(contentAlignmentValues),
          vertical: z.enum(contentAlignmentValues),
        })
        .nullable(),
      lg: q('lg')
        .grab({
          horizontal: z.enum(contentAlignmentValues),
          vertical: z.enum(contentAlignmentValues),
        })
        .nullable(),
    })
    .nullable();
}
