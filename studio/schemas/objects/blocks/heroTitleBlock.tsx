import {defineField} from 'sanity';
import {herotitlePartial} from './partials/herotitlePartial';
import {textSizePartial} from './partials/textSizePartial';

export function heroTitleBlock(name = 'title') {
  return defineField({
    name,
    type: 'object',
    fields: [
      herotitlePartial(),
      textSizePartial('textSize', {initialValue: 'large'}),
    ],
  });
}
