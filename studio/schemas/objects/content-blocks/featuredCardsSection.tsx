import { defineField } from 'sanity';
import { titleBlock } from '../blocks/titleBlock';
import { textImageCardObject } from '../objects/textImageCard';

export default defineField({
  name: 'featuredCardsSection',
  title: 'Featured Cards Section',
  type: 'object',
  fields: [
    titleBlock(),
    defineField({
      name: 'textImageCards',
      title: 'Text Image Cards',
      type: 'array',
      of: [textImageCardObject('textImageCardObject')],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value || 'Featured Cards Section',
      };
    },
  },
});
