import {defineField} from 'sanity';
import {colorThemeBlock} from '../blocks/colorTheme';
import headlineBlock from '../blocks/headlineBlock';
import {mediaContainerBlock} from '../blocks/mediaContainerBlock';

export default defineField({
  name: 'mediaContainerCarouselSection',
  title: 'Media Container Carousel',
  type: 'object',
  fields: [
    headlineBlock(),
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [mediaContainerBlock()],
    },
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Media Container Carousel',
      };
    },
  },
});
