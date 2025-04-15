import {defineField} from 'sanity';
import {tileBlock} from '../blocks/tileBlock';
import { colorThemeBlock } from '../blocks/colorTheme';
import headlineBlock from '../blocks/headlineBlock';

export default defineField({
  name: 'bentoBoxSection',
  title: 'Bento Box',
  type: 'object',
  fields: [
    headlineBlock(),
    {
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [tileBlock()],
    },
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bento Box',
      };
    },
  },
});
