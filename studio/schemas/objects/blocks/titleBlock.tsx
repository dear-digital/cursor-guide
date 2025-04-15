import {defineField} from 'sanity';
import {textSizePartial} from './partials/textSizePartial';

export function titleBlock(name = 'title') {
  return defineField({
    name,
    title: name,
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'internationalizedArrayRichTitle',
      }),
      textSizePartial(),
    ],
  });
}
