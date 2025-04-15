import {defineField} from 'sanity';

export default defineField({
  name: 'ratioPartial',
  type: 'object',
  fields: [
    defineField({
      name: 'ratio',
      type: 'string',
      options: {
        list: [
          {
            title: '1:1',
            value: '1:1',
          },
          {
            title: '4:3',
            value: '4:3',
          },
          {
            title: '16:9',
            value: '16:9',
          },
          {
            title: '21:9',
            value: '21:9',
          },
        ],
        layout: 'dropdown',
      },
      initialValue: '1:1',
    }),
  ],
});
