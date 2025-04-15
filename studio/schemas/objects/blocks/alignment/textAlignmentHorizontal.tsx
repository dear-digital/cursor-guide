import { defineField } from 'sanity';
import { textAlignmentSingularPartial } from '../partials/textAlignmentSingularPartial';

export function textAlignmentHorizontal(name = 'textAlignment') {
  return defineField({
    name,
    title: 'Text alignment',
    type: 'object',
    fields: [
      textAlignmentSingularPartial('sm'),
    ],
  });
}
