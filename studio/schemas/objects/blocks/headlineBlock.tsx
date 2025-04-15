import {defineField} from 'sanity';
import {titleBlock} from './titleBlock';
import { textBlock } from './textBaseBlock';

export default function headlineBlock(name = 'headlineBlock') {
  return defineField({
    name,
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
            {title: 'Green', value: 'green'},
            {title: 'Blue', value: 'blue'},
            {title: 'Purple', value: 'purple'},
            {title: 'Red', value: 'red'},
            {title: 'Orange', value: 'orange'},
            {title: 'Yellow', value: 'yellow'},
            {title: 'Anthracite', value: 'anthracite'},
            {title: 'White', value: 'white'},
          ],
        },
        initialValue: 'green',
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'Headline',
        };
      },
    },
  });
}
