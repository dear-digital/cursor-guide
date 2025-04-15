import {EyeOff} from 'lucide-react';
import {defineField} from 'sanity';
import {IconCollectionTag} from '../../../components/icons/CollectionTag';
import {titleBlock} from '../blocks/titleBlock';
import {linkInternationalizedBlock} from '../blocks/linkInternationalizedBlock';

export default defineField({
  name: 'relatedProductsSection',
  title: 'Related Products',
  type: 'object',
  fields: [
    titleBlock('title'),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
    }),
    linkInternationalizedBlock(),
    defineField({
      name: 'maxProducts',
      title: 'Maximum products to show',
      type: 'rangeSlider',
      options: {
        min: 1,
        max: 25,
      },
      validation: (Rule: any) => Rule.required().min(1).max(25),
    }),
    defineField({
      type: 'sectionSettings',
      name: 'settings',
    }),
  ],
  initialValue: {
    maxProducts: 6,
  },
  preview: {
    select: {
      settings: 'settings',
    },
    prepare({settings}: any) {
      return {
        title: 'Related Products',
        media: () => (settings?.hide ? <EyeOff /> : <IconCollectionTag />),
      };
    },
  },
});
