import {defineField} from 'sanity';
import {imageResponsiveBlock} from './imageResponsiveBlock';

export function bentoCarouselTileBlock(name = 'bentoCarouselTileBlock') {
  return defineField({
    name,
    type: 'object',
    fields: [
      imageResponsiveBlock('image', true, 'Image', true),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'textBottom',
        title: 'Text Bottom',
        type: 'boolean',
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'Tile',
        };
      },
    },
  });
}
