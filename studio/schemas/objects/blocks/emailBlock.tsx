import {defineField} from 'sanity';

export function emailBlock(name = 'email') {
  return defineField({
    name,
    title: 'Email',
    type: 'string',
    validation: (Rule) =>
      Rule.required()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email')
        .error('Must be a valid email address'),
  });
}
