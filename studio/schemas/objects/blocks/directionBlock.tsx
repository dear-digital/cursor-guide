import {defineField} from 'sanity';

export function directionBlock(name = 'direction') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'direction',
        type: 'string',
        options: {
          list: [
            {
              title: 'Text on the left',
              value: 'textImage',
            },
            {
              title: 'Text on the right',
              value: 'ImageText',
            },
          ],
          layout: 'dropdown',
        },
        initialValue: 'textImage',
      }),
    ],
  });
}

