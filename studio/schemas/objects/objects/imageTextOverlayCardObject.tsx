import { defineField } from 'sanity';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';
import { textBlock } from '../blocks/textBaseBlock';

export function imageTextOverlayCardObject(
  name = 'imageTextOverlayCardObject',
) {
  return defineField({
    name,
    type: 'array',
    of: [
      {
        name: 'items',
        type: 'object',
        fields: [
          textBlock(),
          imageResponsiveBlock(),
          linkInternationalizedBlock(),
          textBlock('overlayText'),
        ],
        preview: {
          select: {
            title: 'text',
            media: 'image',
          },
          prepare({title, media}) {
            return {
              title: title?.[0]?.value || 'Image text overlay card',
              media,
            };
          },
        }
      },
    ],
  });
}
