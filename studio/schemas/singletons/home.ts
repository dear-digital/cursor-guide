import { defineType } from 'sanity';
import { contentBlockSections } from '../objects/content-blocks/contentBlockList';
import { seoFields } from '../objects/global/seo';
import { heroBlockSections } from '../objects/hero-blocks/heroBlocksList';

export default defineType({
  name: 'home',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    heroBlockSections(),
    contentBlockSections(),
    seoFields(),
  ],
  preview: {
    prepare: () => ({ title: 'Home' }),
  },
});
