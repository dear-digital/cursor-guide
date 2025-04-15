import {defineField} from 'sanity';
import {imagePartial} from './partials/imagePartial';

export function imageResponsiveLocalizedBlock() {
  return defineField({
    name: 'imageLocalizedBlock',
    title: 'Image',
    type: 'object',
    fields: [
      imagePartial('image'),
    ],
    preview: {
      prepare() {
        return {
          title: 'Image',
        };
      },
    },
  });
}
