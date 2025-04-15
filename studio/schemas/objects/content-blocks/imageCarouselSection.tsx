import {defineField} from 'sanity';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';
import {eyeCatcherPartial} from '../blocks/partials/eyeCatcherPartial';
import { colorThemeBlock } from '../blocks/colorTheme';
import headlineBlock from '../blocks/headlineBlock';
import { textBlock } from '../blocks/textBaseBlock';

export default defineField({
  name: 'imageCarouselSection',
  title: 'Image Carousel',
  type: 'object',
  fields: [
    headlineBlock(),
    imageResponsiveBlock('productImage'),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [imageResponsiveBlock('carouselImage', true)],
    }),
    textBlock('imageCarouselText'),
    defineField({
      name: 'showEyeCatcher',
      type: 'boolean',
      title: 'Show Eye Catcher',
      initialValue: true,
    }),
    eyeCatcherPartial(),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Carousel',
      };
    },
  },
});
