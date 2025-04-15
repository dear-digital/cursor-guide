import {defineField} from 'sanity';
import {textAlignmentPartial} from '../partials/textAlignmentPartial';

export function textAlignmentResponsive(name = 'textAlignment') {
  return defineField({
    name,
    description: 'Align text horizontally for mobile and desktop',
    type: 'object',
    fields: [textAlignmentPartial('sm'), textAlignmentPartial('lg')],
  });
}
