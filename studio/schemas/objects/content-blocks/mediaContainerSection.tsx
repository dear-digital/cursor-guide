import {defineField} from 'sanity';
import {colorThemeBlock} from '../blocks/colorTheme';
import headlineBlock from '../blocks/headlineBlock';
import {textBlock} from '../blocks/textBaseBlock';

export default defineField({
  name: 'mediaContainerSection',
  title: 'Media Container',
  type: 'object',
  fields: [
    defineField({
      name: 'imageLocalized',
      type: 'internationalizedArrayImageLocalizedBlock',
    }),
    defineField({
      name: 'videoLocalized',
      type: 'internationalizedArrayVideoLocalizedBlock',
    }),
    headlineBlock(),
    textBlock('mediaContainerText'),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Media Container',
      };
    },
  },
});
