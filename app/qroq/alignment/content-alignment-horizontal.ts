import {q, z} from 'groqd';
import {contentAlignmentValues} from '~/lib/utilities/contentAlignment';

export function contentAlignmentHorizontalBlockQuery(
  name = 'contentAlignment',
) {
  return q(name)
    .grab({
      aligment: z.enum(contentAlignmentValues),
    })
    .nullable();
}
