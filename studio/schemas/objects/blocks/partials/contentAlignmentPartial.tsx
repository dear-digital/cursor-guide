import {defineField} from 'sanity';

export function contentAlignmentPartial(name: 'sm' | 'lg' = 'sm') {
  return defineField({
  name,
  type: 'object',
  fields: [
    defineField({
      name: 'horizontal',
      type: 'string',
      options: {
        list: [
          {
            title: 'Start',
            value: 'start',
          },
          {
            title: 'Middle',
            value: 'middle',
          },
          {
            title: 'End',
            value: 'end',
          },
        ],
        layout: 'dropdown',
      },
      initialValue: 'start',
    }),
    defineField({
      name: 'vertical',
      type: 'string',
      options: {
        list: [
          {
            title: 'Start',
            value: 'start',
          },
          {
            title: 'Middle',
            value: 'middle',
          },
          {
            title: 'End',
            value: 'end',
          },
        ],
        layout: 'dropdown',
      },
      initialValue: 'start',
    }),
  ],
})};
