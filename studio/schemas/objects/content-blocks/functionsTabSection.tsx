import {defineField} from 'sanity';
import {listItemBlock} from '../blocks/listItemBlock';
import { colorThemeBlock } from '../blocks/colorTheme';

export default defineField({
  name: 'functionsTabSection',
  title: 'Functions Tab',
  type: 'object',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [listItemBlock()],
    },
    defineField({
      name: 'lastLineText',
      title: 'Last Line Text',
      type: 'internationalizedArrayText',
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Functions Tab',
      };
    },
  },
});
