import {defineField} from 'sanity';

export function textSizePartial(name = 'textSize', options: { [x: string ]: any} = { initialValue: 'base'}) {
  return defineField({
    name,
    type: 'string',
    options: {
      list: [
        {
          title: `Large`,
          value: `large`,
        },
        {
          title: `Base`,
          value: `base`,
        },
        {
          title: `Small`,
          value: `small`,
        },
      ],
      layout: 'dropdown',
    },
    ...(options && Object.keys(options).length > 0 ? options : {}), // Conditionally add props
  });
}
