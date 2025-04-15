import {EyeOff, TextSelect} from 'lucide-react';
import {defineField} from 'sanity';
import maxWidthBaseBlock from '../blocks/maxWidthBaseBlock';
import {textBlock} from '../blocks/textBaseBlock';
import sectionSettings from '../global/sectionSettings';

export default defineField({
  name: 'richtextSection',
  title: 'Richtext',
  type: 'object',
  fields: [
    textBlock(),
    maxWidthBaseBlock,
    sectionSettings
  ],
  initialValue: {
    maxWidth: 900,
  },
  preview: {
    select: {
      settings: 'settings',
    },
    prepare({settings}: any) {
      return {
        title: 'Richtext',
        media: () => (settings?.hide ? <EyeOff /> : <TextSelect />),
      };
    },
  },
});
