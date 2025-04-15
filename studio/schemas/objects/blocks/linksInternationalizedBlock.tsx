import { defineField } from 'sanity';
import { linkInternationalizedBlock } from './linkInternationalizedBlock';

export function linksInternationalizedBlock(name = 'linksBlock') {
  return defineField({
    name,
    title: 'Button Group',
    type: 'object',
    fields: [
      defineField({
        name: 'buttons',
        title: 'Buttons',
        type: 'array',
        of: [linkInternationalizedBlock()],
      }),
      defineField({
        name: 'alignment',
        type: 'string',
        initialValue: 'center',
        options: {
          list: [
            { title: 'Left', value: 'left' },
            { title: 'Center', value: 'center' },
            { title: 'Right', value: 'right' },
          ],
          layout: 'dropdown',
        },
      }),
      defineField({
        name: 'layout',
        type: 'string',
        initialValue: 'horizontal',
        options: {
          list: [
            { title: 'Horizontal', value: 'horizontal' },
            { title: 'Vertical', value: 'vertical' },
          ],
          layout: 'dropdown',
        },
      }),
      defineField({
        name: 'sizing',
        type: 'string',
        title: 'Sizing',
        initialValue: 'hug',
        options: {
          list: [
            { title: 'Fill', value: 'fill' },
            { title: 'Hug', value: 'hug' },
            { title: '50%', value: '50%' },
          ],
          layout: 'dropdown',
        },
      }),
    ],
  });
}