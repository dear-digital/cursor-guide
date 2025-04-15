import { defineField } from 'sanity';
import { contentAlignmentResponsive } from '../blocks/alignment/contentAlignmentResponsive';
import { textAlignmentResponsive } from '../blocks/alignment/textAlignmentResponsive';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';
import { textBlock } from '../blocks/textBaseBlock';
import { titleBlock } from '../blocks/titleBlock';

export function imageTextOverlayObject(
  name = 'imageTextOverlayObject',
) {
  return defineField({
    name,
    type: 'array',
    of: [
      {
        name: 'items',
        type: 'object',
        fields: [
          imageResponsiveBlock(),
          titleBlock(),
          titleBlock('subTitle'),
          textBlock(),
          linkInternationalizedBlock(),
          contentAlignmentResponsive(),
          textAlignmentResponsive(),
        ],
        preview: {
          select: {
            title: 'text',
            media: 'image',
          },
          prepare({title, media}) {
            return {
              title: title?.[0]?.value || 'Image text overlay',
              media,
            };
          },
        }
      },
    ],
  });
}
