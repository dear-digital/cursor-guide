import { defineType } from 'sanity';
import { contentBlockSections } from '../objects/content-blocks/contentBlockList';
import { documentTitle } from '../objects/global/documentTtitle';
import { seoFields } from '../objects/global/seo';
import { slugField } from '../objects/global/slug';
import { heroBlockSections } from '../objects/hero-blocks/heroBlocksList';

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    heroBlockSections(),
    contentBlockSections(),
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
