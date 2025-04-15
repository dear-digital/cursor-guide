import { defineField } from "sanity";

export function typographyBlock(name = 'typography') {
  return defineField({
    name,
    title: 'Typography',
    type: 'object',
    fields: [
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Paragraph', value: 'p'},
            {title: 'Span', value: 'span'},
          ],
        },
      },
      {
        name: 'text',
        title: 'Text',
        type: 'internationalizedArrayText',
      },
    ],
  });
}