import { defineField } from "sanity";

export function eyeCatcherPartial(name = 'eyecatcher') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'firstLine',
        type: 'internationalizedArrayText',
        title: 'First Line',
      }),
      defineField({
        name: 'secondLine',
        type: 'internationalizedArrayText',
        title: 'Second Line',
      }),
      defineField({
        name: 'backgroundColor',
        type: 'string',
        title: 'Background Color',
        options: {
          list: ['purple', 'green', 'yellow', 'orange', 'red', 'blue'],
        },
        initialValue: 'purple',
      }),
      defineField({
        name: 'rotation',
        type: 'string',
        title: 'Rotation',
        options: {
          list: ['5 degrees', '-5 degrees', 'none'],
        },
        initialValue: 'none',
      }),
      defineField({
        name: 'size',
        type: 'string',
        title: 'Size',
        options: {
          list: ['small', 'medium', 'large'],
        },
        initialValue: 'small',
      }),
    ]
  })
}