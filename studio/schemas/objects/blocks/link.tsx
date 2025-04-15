import {Link2} from 'lucide-react';
import {defineField} from 'sanity';
import internalLinkPartial from './partials/internalLinkPartial';

export default defineField({
  name: 'linkUrlBlock',
  type: 'object',
  title: 'Button',
  icon: () => <Link2 />,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
    }),
    defineField({
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        internalLinkPartial,
        defineField({
          name: 'externalLink',
          type: 'url',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
});
