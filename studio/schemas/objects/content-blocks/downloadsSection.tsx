import {defineField} from 'sanity';
import {titleBlock} from '../blocks/titleBlock';

export default defineField({
  name: 'downloadsSection',
  title: 'Downloads Section',
  type: 'object',
  fields: [
    titleBlock(),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique ID used to navigate to this section. For example: "product-description". Do not use spaces, use hyphens if needed.',
    }),
  ],
  preview: {
    select: {
        fileTitle: 'title',
    },
    prepare({fileTitle}) {
      return {
        title: fileTitle?.[0]?.value || 'Downloads Section',
      };
    },
  },
});
