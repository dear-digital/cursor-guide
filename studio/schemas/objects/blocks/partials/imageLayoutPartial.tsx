import {defineField} from 'sanity';

export default function imageLayoutPartial(name = 'imageLayoutPartial') {
  return defineField({
    name,
    title: 'Image Layout',
    type: 'object',
    fields: [
      defineField({
        name: 'url',
        title: 'URL',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'alt',
        title: 'Alt',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'internationalizedArrayText',
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'Image',
        };
      }
    },
  });
}
