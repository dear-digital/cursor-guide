import {defineField, InsertMenuOptions} from 'sanity';

const heroBlocks = [
  {
    type: 'hero',
  },
];

export const sectionOptionInsertMenu: {insertMenu: InsertMenuOptions} = {
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
  title: 'Hero block',
  name: 'heroBlocks',
  type: 'array',
  group: 'pagebuilder',
  of: heroBlocks,
  options: {
    ...sectionOptionInsertMenu,
  },
  validation: (Rule) => Rule.length(1).error('You can only add one Hero block.'),
});

export function heroBlockSections(name = 'heroBlocks') {
  return defineField({
    name,
    type: 'heroBlocks',
  });
}
