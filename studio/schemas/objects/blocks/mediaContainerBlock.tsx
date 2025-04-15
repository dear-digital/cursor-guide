import {defineField} from 'sanity';
import {textBlock} from './textBaseBlock';

export function mediaContainerBlock() {
  return defineField({
    name: 'mediaContainerBlock',
    title: 'Media Container',
    type: 'object',
    fields: [
      defineField({
        name: 'imageLocalized',
        type: 'internationalizedArrayImageLocalizedBlock',
      }),
      defineField({
        name: 'videoLocalized',
        type: 'internationalizedArrayVideoLocalizedBlock',
      }),
      textBlock('mediaContainerText'),
    ],
    preview: {
      prepare() {
        return {
          title: 'Media Container',
        };
      },
    },
  });
}
