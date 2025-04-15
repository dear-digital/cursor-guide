import {defineField, defineType} from 'sanity';
import {Grid2X2} from 'lucide-react';

export default defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  icon: Grid2X2,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The main title of the feature grid section',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'A subtitle or description for the feature grid',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      description: 'Add features to display in the grid',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'Select an icon for this feature',
              type: 'string',
              options: {
                list: [
                  {title: 'Check', value: 'check'},
                  {title: 'Star', value: 'star'},
                  {title: 'Shield', value: 'shield'},
                  {title: 'Lightning', value: 'lightning'},
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              description: 'The title of this feature',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              description: 'A description of this feature',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      features: 'features',
    },
    prepare({title, features}) {
      return {
        title: title || 'Feature Grid',
        subtitle: `${features?.length || 0} features`,
      };
    },
  },
}); 