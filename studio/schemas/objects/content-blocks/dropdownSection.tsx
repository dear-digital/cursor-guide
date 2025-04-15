import { defineField, defineType } from 'sanity';
import { colorThemeBlock } from '../blocks/colorTheme';
import { textBlock } from '../blocks/textBaseBlock';
import headlineBlock from '../blocks/headlineBlock';

export default defineType({
  name: 'dropdownSection',
  title: 'Dropdown Section',
  type: 'object',
  fields: [
    headlineBlock(),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    }),
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
                title: title?.[0]?.value || 'No question',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'showMoreText',
      title: 'Show More Text',
      type: 'internationalizedArrayString',
      description: 'Text for the "Show more" button',
    }),
    defineField({
      name: 'showLessText',
      title: 'Show Less Text',
      type: 'internationalizedArrayString',
      description: 'Text for the "Show less" button',
    }),
    defineField({
      name: 'showMoreOption',
      title: 'Show More Option',
      type: 'boolean',
      description: 'Enable/disable the show more/less functionality',
      initialValue: true,
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Dropdown Section',
      };
    },
  },
}); 