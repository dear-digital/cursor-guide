import { defineField, defineType } from 'sanity';
import { sectionSettingsBlock } from '../blocks/sectionSettingsBlock';
import { textBlock } from '../blocks/textBaseBlock';

import { titleBlock } from '../blocks/titleBlock';

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    titleBlock('title'),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineField({
          name: 'faq',
          title: 'FAQ',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'internationalizedArrayString',
            }),
            textBlock('answer'),
            defineField({
              name: 'id',
              title: 'ID',
              type: 'string',
              description: 'Unique ID used to navigate to this question. For example: "shipping-policy". Do not use spaces, use hyphens if needed.',
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
            prepare({title}) {
              return {
                title: title?.[0]?.value || 'No title',
              };
            },
          },
        }),
      ],
    }),
    sectionSettingsBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Section',
      };
    },
  },
});
