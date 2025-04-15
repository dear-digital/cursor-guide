import { defineField } from "sanity";
import { iconPartial } from "../blocks/partials/iconPartial";
import { colorThemeBlock } from "../blocks/colorTheme";

export default defineField({
  name: 'scrollRowSection',
  title: 'Scroll Row',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'internationalizedArrayString',
            }),
            iconPartial(),
          ],
        },
      ],
    }),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Scroll Row',
      };
    },
  },
})