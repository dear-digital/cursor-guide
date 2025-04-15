import {defineField} from 'sanity';
import {titleBlock} from '../blocks/titleBlock';
import {linksInternationalizedBlock} from '../blocks/linksInternationalizedBlock';
import {colorThemeBlock} from '../blocks/colorTheme';
import { textBlock } from '../blocks/textBaseBlock';

export default defineField({
  name: 'headlineSection',
  title: 'Headline',
  type: 'object',
  fields: [
    titleBlock('headline'),
    textBlock('richSubline'),
    defineField({
      name: 'eyebrowline',
      title: 'Eyebrow Line',
      type: 'internationalizedArrayText',
    }),
    linksInternationalizedBlock(),
    defineField({
      name: 'spaceBelow',
      title: 'Space Below',
      type: 'string',
      options: {
        list: ['default', 'additional'],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'strongColor',
      title: 'Strong Color',
      type: 'string',
      options: {
        list: [
          'green',
          'blue',
          'purple',
          'red',
          'orange',
          'yellow',
          'anthracite',
          'white',
        ],
      },
      initialValue: 'green',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
        }),
        defineField({
          name: 'telegram',
          title: 'Telegram',
          type: 'string',
        }),
        defineField({
          name: 'x',
          title: 'X',
          type: 'string',
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
        }),
      ],
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Headline',
      };
    },
  },
});
