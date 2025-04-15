import {defineField} from 'sanity';
import {iconPartial} from './partials/iconPartial';
import { imageResponsiveBlock } from './imageResponsiveBlock';

export function tileBlock(name = 'tileBlock') {
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
      iconPartial(),
      defineField({
        name: 'text',
        title: 'Text',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'imageBottom',
        title: 'Image Bottom',
        type: 'boolean',
      }),
      defineField({
        name: 'bigTile',
        title: 'Big Tile',
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
