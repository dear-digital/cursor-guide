import {defineField} from 'sanity';
import desktopSlidesBlock from '../blocks/desktopSlidesBlock';
import { colorThemeBlock } from '../blocks/colorTheme';

export default defineField({
  name: 'galleryCarouselSection',
  title: 'Gallery Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'desktopSlides',
      title: 'Slides',
      type: 'array',
      of: [desktopSlidesBlock()],
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Carousel',
      };
    },
  },
});
