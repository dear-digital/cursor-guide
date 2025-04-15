import { imagePartial } from './partials/imagePartial';

export function imageBlock(name = 'imageBlock') {
  return imagePartial(name, {
    image: {validation: (Rule: any) => Rule.required()},
  });
}
