import {defineField} from 'sanity';
import {contentAlignmentSingularPartial} from '../partials/contentAlignmentSingularPartial';

export function contentAlignmentHorizontalResponsive(
  name = 'contentAlignment',
) {
  return defineField({
    name,
    description: 'Position content horizontally for mobile and desktop',
    type: 'object',
    fields: [
      contentAlignmentSingularPartial('sm'),
      contentAlignmentSingularPartial('lg'),
    ],
  });
}
