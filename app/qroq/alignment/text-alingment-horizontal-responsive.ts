import { q, z } from 'groqd';
import { textAlignmentValues } from '~/lib/utilities/textAlignment';

export function textAlignmentHorizontalResponsiveBlockQuery(
  name = 'textAlignment',
) {
  return q(name)
    .grab({
      sm: q('sm')
        .grab({
          alignment: z.enum(textAlignmentValues),
        })
        .nullable(),
      lg: q('lg')
        .grab({
          alignment: z.enum(textAlignmentValues),
        })
        .nullable(),
    })
    .nullable();
}