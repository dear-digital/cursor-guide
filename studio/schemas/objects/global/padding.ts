import {defineField} from 'sanity';

export default defineField({
  name: 'padding',
  title: 'Padding',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'top',
      title: 'Top padding',
      type: 'string',
      initialValue: 'base',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Base', value: 'base'},
          {title: 'Large', value: 'large'},
          {title: 'None', value: 'none'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom padding',
      type: 'string',
      initialValue: 'base',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Base', value: 'base'},
          {title: 'Large', value: 'large'},
          {title: 'None', value: 'none'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
  initialValue: {
    top: 'base',
    bottom: 'base',
  },
});
