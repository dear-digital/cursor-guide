import {defineField} from 'sanity';

export function videoResponsiveBlock(name = 'videoBlock', onlySm = false, title = 'Video') {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: (onlySm ? 'video' : 'sm'),
        type: 'videoPartial',
      }),
      ...(onlySm ? [] : [
        defineField({
          name: 'lg',
          type: 'videoPartial',
        }),
      ]),
      defineField({
        name: 'autoPlay',
        description: 'Autoplay video',
        type: 'boolean',
        initialValue: false,
      }),
    ],
  });
}
