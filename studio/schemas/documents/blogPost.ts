import { defineType } from 'sanity';
import { documentTitle } from '../objects/global/documentTtitle';
import { seoFields } from '../objects/global/seo';
import { slugField } from '../objects/global/slug';

export default defineType({
  name: 'blogPost',
  title: 'Blog posts',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    documentTitle(),
    seoFields(),
    slugField(),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value || 'No title',
      };
    },
  },
});
