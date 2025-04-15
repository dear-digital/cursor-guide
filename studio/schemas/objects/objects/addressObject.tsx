import {defineField} from 'sanity';

export function addressObject(name = 'address') {
  return defineField({
    name,
    type: 'object',
    fields: [
      defineField({
        name: 'streetName',
        title: 'Street Name',
        type: 'internationalizedArrayString',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'city',
        title: 'City',
        type: 'internationalizedArrayString',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'googleMapsUrl',
        title: 'Google Maps URL',
        type: 'url',
        validation: (Rule) =>
          Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
      }),
    ],
  });
}
