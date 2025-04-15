import {Link2} from 'lucide-react';
import {defineField} from 'sanity';
import {iconPartial} from './partials/iconPartial';

export function linkInternationalizedBlock(
  name = 'linkBlock',
  noStyle = false,
) {
  const baseFields = [
    defineField({
      name: 'link',
      type: 'internationalizedArrayLinkUrlBlock',
    }),
  ];

  const styleFields = [
    defineField({
      name: 'style',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Tertiary', value: 'tertiary'},
          {title: 'Transparent', value: 'transparent'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'size',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'invertColors',
      type: 'boolean',
      initialValue: false,
    }),
    iconPartial(),
    defineField({
      name: 'iconPosition',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'disabled',
      type: 'boolean',
      initialValue: false,
    }),
  ];

  return defineField({
    name,
    type: 'object',
    title: 'Button',
    icon: () => <Link2 />,
    fields: noStyle ? baseFields : [...baseFields, ...styleFields],
    preview: {
      prepare() {
        return {
          title: 'Link',
        };
      },
    },
  });
}
