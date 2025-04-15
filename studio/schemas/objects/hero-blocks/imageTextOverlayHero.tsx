import { EyeOff, Image, Text } from 'lucide-react';
import { defineField } from 'sanity';
import { contentAlignmentResponsive } from '../blocks/alignment/contentAlignmentResponsive';
import { textAlignmentResponsive } from '../blocks/alignment/textAlignmentResponsive';
import { heroTitleBlock } from '../blocks/heroTitleBlock';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';
import { sectionSettingsBlock } from '../blocks/sectionSettingsBlock';
import { textBlock } from '../blocks/textBaseBlock';

interface Settings {
  hide?: boolean;
}

interface PreviewProps {
  settings: Settings;
}

export default defineField({
  name: 'imageTextOverlayHero',
  title: 'Hero image text overlay',
  type: 'object',
  fields: [
    imageResponsiveBlock(),
    heroTitleBlock(),
    textBlock(),
    linkInternationalizedBlock(),
    contentAlignmentResponsive(),
    textAlignmentResponsive(),
    sectionSettingsBlock(),
  ],
  preview: {
    select: {
      settings: 'settings',
    },
    prepare({settings}: PreviewProps) {
      return {
        title: 'Hero image text overlay',
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
