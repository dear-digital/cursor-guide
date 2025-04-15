import {defineField} from 'sanity';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';
import {titleBlock} from '../blocks/titleBlock';
import {colorThemeBlock} from '../blocks/colorTheme';

export default defineField({
  name: 'fullWidthImageSection',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    imageResponsiveBlock(),
    titleBlock('headline'),
    defineField({
      name: 'btnText',
      title: 'Button Text',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'roundedCorners',
      title: 'Rounded Corners',
      type: 'boolean',
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Full Width Image',
      };
    },
  },
});
