import {defineField} from 'sanity';

export function contentAlignmentSingularPartial(name = 'sm', orientation: 'horizontal' | 'vertical' = 'horizontal') {
  return defineField({
  name,
  type: 'object',
  fields: [
    defineField({
      name: orientation,
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
