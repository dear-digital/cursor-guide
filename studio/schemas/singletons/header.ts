import { defineField, defineType } from 'sanity';
import { textBlock } from '../objects/blocks/textBaseBlock';

const menuField = () =>
  defineField({
    name: 'menu',
    title: 'Menu',
    type: 'headerNavigation',
  });

const announcementField = () =>
  defineField({
    name: 'announcement',
    title: 'Announcement',
    type: 'object',
    fields: [
      defineField({
        name: 'label',
        title: 'Label',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'link',
        title: 'Link',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'showAnnouncement',
        title: 'Show Announcement',
        type: 'boolean',
        initialValue: false,
      }),
    ],
  });


const headerFields = [
  menuField(),
  announcementField()
];

// Export the header type using the field functions
export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: headerFields,
  preview: {
    prepare: () => ({ title: 'Header' }),
  },
});