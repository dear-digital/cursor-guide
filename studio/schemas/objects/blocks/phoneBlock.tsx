import {defineField} from 'sanity';

export function phoneBlock(name = 'phone') {
  return defineField({
    name,
    title: 'Phone Number',
    type: 'string',
    validation: (Rule) =>
      Rule.required().regex(
        /^\+?[0-9\s\-().]{7,15}$/,
        'Must be a valid phone number',
      ),
  });
}
