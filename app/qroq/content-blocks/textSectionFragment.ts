import type { Selection } from 'groqd';

import { q } from 'groqd';

import { textAlignmentHorizontalResponsiveBlockQuery } from '../alignment/text-alingment-horizontal-responsive';
import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { linksBlockQuery } from '../blocks/linksblock-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';

export const TEXT_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('textSection'),
  colorTheme: colorThemeBlockQuery(),  
  linksBlock: linksBlockQuery(),
  settings: sectionSettingsBlockQuery(),
  text: textBlockQuery(),
  textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
