import { defineField } from 'sanity';
import headlineBlock from '../blocks/headlineBlock';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';
import { iconPartial } from '../blocks/partials/iconPartial';

export default defineField({
  name: 'multiColumnSection',
  title: 'Multi Column Section',
  type: 'object',
  fields: [
    headlineBlock(),
    defineField({
      name: 'multiColumnCards',
      title: 'Multi Column Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            imageResponsiveBlock('multiColumnImage', false, 'Image', true),
            iconPartial(),
            defineField({
              name: 'smallImage',
              type: 'boolean',
              title: 'Small Image',
              initialValue: false,
            }),
            defineField({
              name: 'multiColumnTitle',
              type: 'internationalizedArrayString',
              title: 'Title',
            }),
            defineField({
              name: 'multiColumnText',
              type: 'internationalizedArrayString',
              title: 'Text',
            }),
            linkInternationalizedBlock('multiColumnLink'),
          ],
          preview: {
            select: {
                title: 'multiColumnTitle',
            },
            prepare({title}) {
                return {
                    title: title?.[0]?.value || 'Title',
                }
            }
          }
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value || 'Multi Column Section',
      };
    },
  },
});
