import {defineField} from 'sanity';

export function imagePartial(
  name = 'imageBlock',
  props?: {image?: {[key: string]: any}; ratio?: {[key: string]: any}},
) {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'asset',
        type: 'image',
        ...(props?.image ? props.image : {}), // Conditionally add props
      }),
      defineField({
        name: 'ratio',
        type: 'ratioPartial',
        ...(props?.ratio ? props.ratio : {}),
      }),
    ],
    preview: {
      prepare() {
        return {
          title: 'Image',
        };
      },
    },
  });
}
