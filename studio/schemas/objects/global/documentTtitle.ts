import { defineField } from 'sanity';

export function documentTitle(){
  return defineField({
    name: 'title',
    type: 'internationalizedArrayString',
    title: 'Title',
  })
}
