import { defineField } from 'sanity';
import { textAlignmentResponsive } from '../blocks/alignment/textAlignmentResponsive';
import { linksInternationalizedBlock } from '../blocks/linksInternationalizedBlock';
import { sectionSettingsBlock } from '../blocks/sectionSettingsBlock';
import { textBlock } from '../blocks/textBaseBlock';
import { titleBlock } from '../blocks/titleBlock';
import { colorThemeBlock } from '../blocks/colorTheme';

export default defineField({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  fields: [
    titleBlock(),
    textBlock(),
    linksInternationalizedBlock(),
    textAlignmentResponsive(),
    sectionSettingsBlock(),
    colorThemeBlock(),
  ],
  preview: {
    select: {
      settings: 'settings',
    },
    prepare() {
      return {
        title: 'Text Section',
      };
    },
  },
});
