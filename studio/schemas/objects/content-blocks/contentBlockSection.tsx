import {defineField} from 'sanity';
import headlineBlock from '../blocks/headlineBlock';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';
import {linksInternationalizedBlock} from '../blocks/linksInternationalizedBlock';
import {textBlock} from '../blocks/textBaseBlock';
import {videoResponsiveBlock} from '../blocks/videoResponsiveBlock';
import { colorThemeBlock } from '../blocks/colorTheme';

export default defineField({
  name: 'contentBlockSection',
  title: 'Content Block',
  type: 'object',
  fields: [
    headlineBlock(),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: ['inGrid', 'fullWidth'],
      },
      initialValue: 'inGrid',
    }),
    defineField({
      name: 'mediaAlignment',
      title: 'Media Alignment',
      type: 'string',
      options: {
        list: ['left', 'right'],
      },
      initialValue: 'left',
    }),
    imageResponsiveBlock(),
    videoResponsiveBlock(),
    textBlock(),
    linksInternationalizedBlock(),
    colorThemeBlock(),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique ID used to navigate to this section. For example: "product-description". Do not use spaces, use hyphens if needed.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Content Block',
      };
    },
  },
});
