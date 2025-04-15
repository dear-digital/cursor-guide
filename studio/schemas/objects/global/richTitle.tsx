import {defineArrayMember, defineField} from 'sanity';

export default defineField({
  type: 'array',
  name: 'richTitle',
  of: [
    defineArrayMember({
      type: 'block', // Block type for rich text
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'}, // Allow only the "strong" decorator
        ],
        annotations: [], // Disable annotations
      },
      styles: [
        {title: 'Heading 1', value: 'h1'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Heading 5', value: 'h5'},
        {title: 'Heading 6', value: 'h6'},
      ], // Allow only H2 to H6
      lists: [], // Disable lists
    }),
  ],
});
