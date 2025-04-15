import {defineField} from 'sanity';
import { imageResponsiveBlock } from './imageResponsiveBlock';

export default function desktopSlidesBlock(name = 'desktopSlidesBlock') {
  return defineField({
    name,
    title: 'Slides',
    type: 'object',
    fields: [
      defineField({
        name: 'bigImagePosLeft',
        title: 'Big Image Position Left',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'slides',
        title: 'Slides',
        type: 'array',
        of: [imageResponsiveBlock('desktopSlide', true, 'Slide')],
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'Desktop Slides',
        };
      },
    },
  });
}
