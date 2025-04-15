import {defineField} from 'sanity';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { colorThemeBlock } from '../blocks/colorTheme';
import headlineBlock from '../blocks/headlineBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';

export default defineField({
  name: 'productBlockSection',
  title: 'Product Block',
  type: 'object',
  fields: [
    headlineBlock(),
    defineField({
      name: 'title',
      type: 'internationalizedArrayText',
      title: 'Title',
    }),
    defineField({
      name: 'subtitle',
      type: 'internationalizedArrayText',
      title: 'Subtitle',
    }),
    imageResponsiveBlock(),
    linkInternationalizedBlock(),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Block',
      };
    },
  },
});
