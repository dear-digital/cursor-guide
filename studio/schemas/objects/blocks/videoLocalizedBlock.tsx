import { defineField } from "sanity";

export function videoResponsiveLocalizedBlock() {
  return defineField({
    name: 'videoLocalizedBlock',
    title: 'Video',
    type: 'object',
    fields: [
      defineField({
        name: 'video',
        type: 'videoPartial',
      }),
    ],
  })
}
