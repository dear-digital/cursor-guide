import { defineField } from "sanity";

export function textAlignmentPartial(name: 'sm' | 'lg' = 'sm') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'alignment',
        type: 'string',
        options: {
          list: [
            {
              title: 'Left',
              value: 'left',
            },
            {
              title: 'Center',
              value: 'center',
            },
            {
              title: 'Right',
              value: 'right',
            },
          ],
          layout: 'dropdown',
        },
        initialValue: 'left',
      })
    ]
  })
}