import {defineField} from 'sanity';

export function imageWidthBlock(name = 'imageWidthBlock') {
  return defineField({
    name,
    type: 'string',
    options: {
      list: [
        {
          title: 'Full width',
          value: 'full',
        },
        {
          title: 'Container',
          value: 'container',
        },
      ],
      layout: 'dropdown',
    },
    initialValue: 'full',
  });
}
