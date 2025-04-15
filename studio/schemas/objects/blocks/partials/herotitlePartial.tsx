import {defineArrayMember, defineField} from 'sanity';

export function herotitlePartial(name = 'richtitle') {
  return defineField({
    name,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block', // Block type for rich text
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' }, // Allow only the "strong" decorator
          ],
          annotations: [], // Disable annotations
        },
        styles: [
          {title: 'Normal', value: 'normal'}
        ], // Allow only heading styles
        lists: [], // Disable lists
      }),
    ],
  });
}
