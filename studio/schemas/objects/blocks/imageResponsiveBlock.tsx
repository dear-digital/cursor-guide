import {defineField} from 'sanity';
import {imagePartial} from './partials/imagePartial';

export function imageResponsiveBlock(name = 'imageBlock', onlySm = false, title = 'Image', notRequired = false) {
  return defineField({
    name,
    type: 'object',
    title,
    fields: [
      imagePartial(onlySm ? 'image' : 'sm', {
        image: {validation: (Rule: any) => (notRequired ? Rule.optional() : Rule.required())},
      }),
      ...(onlySm ? [] : [imagePartial('lg')]),
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
