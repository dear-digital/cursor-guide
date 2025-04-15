import {defineField} from 'sanity';
import { imageResponsiveBlock } from '../imageResponsiveBlock';
import { videoResponsiveBlock } from '../videoResponsiveBlock';

export function listItemMediaPartial(name = 'media') {
  return defineField({
    name,
    type: 'object',
    fields: [
      imageResponsiveBlock('image', true, 'Image'),
      videoResponsiveBlock('video', true, 'Video'),
    ],
    preview: {
      prepare() {
        return {
          title: 'List Item Media',
        };
      },
    },
  });
}
