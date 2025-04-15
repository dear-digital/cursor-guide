import { defineField } from 'sanity';
import { SlugInt, validateIntSlug } from '../../../utils/slug';

export function slugField() {
  return defineField({
    name: 'slug',
    type: 'internationalizedArraySlug',
    title: 'Slug',
    validation: (Rule) =>
      Rule.required().custom((slugArray: SlugInt[], context) =>
        validateIntSlug({slugArray, context}),
      ),
  })
}
