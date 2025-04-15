import type { Selection } from 'groqd';
import { q } from 'groqd';
import { textImageDirectionBlockQuery } from '../blocks/direction-query';
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';
import { textAlignmentHorizontalResponsiveBlockQuery } from '../alignment/text-alingment-horizontal-responsive';

export const TEXT_IMAGE_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('textImageSection'),
  image: imageResponsiveBlockQuery(),
  title: titleBlockQuery(),
  subtitle: titleBlockQuery('subtitle'),
  text: textBlockQuery(),
  link: linkBlockQuery(),
  direction: textImageDirectionBlockQuery(),
  textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
