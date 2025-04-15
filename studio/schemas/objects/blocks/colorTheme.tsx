import {defineField} from 'sanity';

export function colorThemeBlock(name = 'colorTheme') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'colorTheme',
        title: 'Color Theme',
        type: 'string',
        options: {
          list: [
            {
              title: 'Light',
              value: 'light',
            },
            {
              title: 'Dark',
              value: 'dark',
            },
          ],
          layout: 'dropdown',
        },
        initialValue: 'light',
      }),
    ],
  });
}
