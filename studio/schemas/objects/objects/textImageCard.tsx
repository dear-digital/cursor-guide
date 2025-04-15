import {defineField} from 'sanity';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';
import {linkInternationalizedBlock} from '../blocks/linkInternationalizedBlock';
import {eyeCatcherPartial} from '../blocks/partials/eyeCatcherPartial';

export function textImageCardObject(name = 'textImageCard') {
  return defineField({
    name,
    title: 'Text Image Card',
    type: 'object',
    fields: [
      imageResponsiveBlock('image'),
      eyeCatcherPartial(),
      defineField({
        name: 'title',
        type: 'internationalizedArrayString',
        title: 'Title',
      }),
      linkInternationalizedBlock(),
      defineField({
        name: 'cardType',
        type: 'string',
        initialValue: 'ProductCard',
        options: {
          list: [
            {title: 'Product card', value: 'ProductCard'},
            {title: 'Image card', value: 'ImageCard'},
          ],
          layout: 'dropdown',
        },
      }),
    ],
    preview: {
      select: {
        title: 'title',
      },
      prepare({title}) {
        return {
          title: title ? title[0]?.value : 'No title',
        };
      },
    },
  });
}
