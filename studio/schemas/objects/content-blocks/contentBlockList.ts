import { defineField, InsertMenuOptions } from 'sanity';

const contentBlocks = [
  {
    type: 'fullWidthImageSection',
  },
  {
    type: 'headlineSection',
  },
  {
    type: 'galleryCarouselSection',
  },
  {
    type: 'functionsTabSection',
  },
  {
    type: 'bentoBoxSection',
  },
  {
    type: 'sectionNavigatorSection',
  },
  {
    type: 'bentoCarouselSection',
  },
  {
    type: 'mediaContainerCarouselSection',
  },
  {
    type: 'scrollRowSection',
  },
  {
    type: 'mediaContainerSection',
  },
  {
    type: 'contentBlockSection',
  },
  {
    type: 'textSection',
  },
  {
    type: 'productBlockSection',
  },
  {
    type: 'imageCarouselSection',
  },
  {
    type: 'imageTextCarouselSection',
  },
  {
    type: 'multiColumnSection',
  },
  {
    type: 'faqSection',
  },
  {
    type: 'dropdownSection',
  },
  {
    type: 'orderFormSection',
  },
  {
    type: 'downloadsSection',
  }
];

const pdpSections = [
  {
    type: 'productInformationSection',
  },
  {
    type: 'relatedProductsSection',
  },
  ...contentBlocks,
];

const collectionSectionsList = [
  {
    type: 'collectionBannerSection',
  },
  {
    type: 'collectionProductGridSection',
  },
  ...contentBlocks,
];

export const sectionOptionInsertMenu: { insertMenu: InsertMenuOptions } = {
  insertMenu: {
    views: [
      {
        name: 'grid',
        previewImageUrl: (schemaTypeName) =>
          `/static/assets/${schemaTypeName}.jpg`,
      },
    ],
  },
};

export default defineField({
  title: 'Sections',
  name: 'contentBlocks',
  type: 'array',
  group: 'pagebuilder',
  of: contentBlocks,
  options: {
    ...sectionOptionInsertMenu,
  },
});

export function contentBlockSections(name = 'contentBlocks') {
  return defineField({
    name,
    type: 'contentBlocks',
  });
}

export const productSections = defineField({
  title: 'Sections',
  name: 'productSections',
  type: 'array',
  group: 'pagebuilder',
  of: pdpSections,
  options: {
    ...sectionOptionInsertMenu,
  },
});

export const collectionSections = defineField({
  title: 'Sections',
  name: 'collectionSections',
  type: 'array',
  group: 'pagebuilder',
  of: collectionSectionsList,
  options: {
    ...sectionOptionInsertMenu,
  },
});
