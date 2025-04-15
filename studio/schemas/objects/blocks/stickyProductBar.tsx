import {defineField} from 'sanity';
import {linkInternationalizedBlock} from './linkInternationalizedBlock';
import {imageResponsiveBlock} from './imageResponsiveBlock';

export function stickyProductBar() {
  return defineField({
    name: 'stickyProductBar',
    title: 'Sticky Product Bar',
    type: 'object',
    fields: [
      defineField({
        name: 'showStickyProductBar',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'title',
        type: 'internationalizedArrayString',
      }),
      defineField({
        name: 'subtitle',
        type: 'internationalizedArrayString',
      }),
      linkInternationalizedBlock(),
      imageResponsiveBlock('image', true, 'Image', true),
    ],
  });
}
