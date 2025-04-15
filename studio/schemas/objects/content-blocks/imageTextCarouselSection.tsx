import {defineField} from 'sanity';
import {titleBlock} from '../blocks/titleBlock';
import {colorThemeBlock} from '../blocks/colorTheme';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';

export default defineField({
  name: 'imageTextCarouselSection',
  title: 'Image Text Carousel Section',
  type: 'object',
  fields: [
    titleBlock('headline'),
    imageResponsiveBlock('image'),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [imageResponsiveBlock('carouselImage', true)],
    }),

    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Text Carousel Section',
      };
    },
  },
});
