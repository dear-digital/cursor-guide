import {defineField} from 'sanity';

export default defineField({
  name: 'sectionNavigatorSection',
  title: 'Section Navigator',
  type: 'object',
  fields: [
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        defineField({
          name: 'navigationItem',
          title: 'Navigation Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'internationalizedArrayText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'id',
              title: 'Section ID',
              type: 'string',
              description: 'Unique ID used to navigate to this section (no spaces, use hyphens if needed)',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'id',
            },
            prepare({title, subtitle}) {
              return {
                title: title?.[0]?.value || 'Navigation Item',
                subtitle: subtitle || '',
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Section Navigator',
      };
    },
  },
});
