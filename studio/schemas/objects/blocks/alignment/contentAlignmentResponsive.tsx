import {defineField} from 'sanity';
import {contentAlignmentPartial} from '../partials/contentAlignmentPartial';

export function contentAlignmentResponsive(name = 'contentAlignment') {
  return defineField({
    name,
    description: 'Position content horizontally for mobile and desktop',
    type: 'object',
    fields: [contentAlignmentPartial('sm'), contentAlignmentPartial('lg')],
  });
}
