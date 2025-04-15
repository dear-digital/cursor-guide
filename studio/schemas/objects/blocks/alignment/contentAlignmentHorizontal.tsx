import {defineField} from 'sanity';
import {contentAlignmentSingularPartial} from '../partials/contentAlignmentSingularPartial';

export function contentAlignmentHorizontal(name = 'contentAlignment') {
  return defineField({
    name,
    description: 'Position content horizontally',
    title: 'Content position horizontal ',
    type: 'object',
    fields: [
      contentAlignmentSingularPartial('sm'),
    ],
  });
}
