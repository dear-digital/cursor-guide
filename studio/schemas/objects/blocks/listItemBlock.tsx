import {defineField} from 'sanity';
import {iconPartial} from './partials/iconPartial';
import {listItemMediaPartial} from './partials/listItemMediaPartial';

export function listItemBlock(name = 'listItem') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        type: 'internationalizedArrayText',
      }),
      defineField({
        name: 'isActive',
        title: 'Is Active',
        type: 'boolean',
      }),
      iconPartial(),
      defineField({
        name: 'useIcon',
        title: 'Use Icon',
        type: 'boolean',
      }),
      listItemMediaPartial(),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'internationalizedArrayText',
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'List Item',
        };
      },
    },
  });
}
