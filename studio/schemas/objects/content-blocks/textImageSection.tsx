import { EyeOff, Image, Text } from 'lucide-react';
import { defineField } from 'sanity';
import { directionBlock } from '../blocks/directionBlock';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';
import { sectionSettingsBlock } from '../blocks/sectionSettingsBlock';
import { textBlock } from '../blocks/textBaseBlock';
import { titleBlock } from '../blocks/titleBlock';
import { textAlignmentResponsive } from '../blocks/alignment/textAlignmentHorizontalResponsive';

export default defineField({
  name: 'textImageSection',
  title: 'Text Image',
  type: 'object',
  fields: [
    imageResponsiveBlock(),
    titleBlock(),
    titleBlock('subtitle'),
    textBlock(),
    linkInternationalizedBlock(),
    directionBlock(),
    textAlignmentResponsive(),
    sectionSettingsBlock(),
  ],
  preview: {
    select: {
      settings: 'settings',
    },
    prepare({settings}: any) {
      return {
        title: 'Text Image',
        media: () =>
          settings?.hide ? (
            <EyeOff />
          ) : (
            <>
              <Image /> <Text />
            </>
          ),
      };
    },
  },
});
