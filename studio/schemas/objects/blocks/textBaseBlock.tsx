import {defineField} from 'sanity';

export function textBlock(name = 'textBlock') {
  return defineField({
    name,
    title: name,
    type: 'internationalizedArrayRichtext',
  });
}
