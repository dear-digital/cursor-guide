import type { Selection } from 'groqd';

import { q } from 'groqd';

import { contentAlignmentHorizontalResponsiveBlockQuery } from '../alignment/content-alignment-horizontal-responsive';
import { textAlignmentHorizontalResponsiveBlockQuery } from '../alignment/text-alingment-horizontal-responsive';
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';

export const IMAGE_TEXT_OVERLAY_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageTextOverlaySection'),
  bowPosition: q.string(),
  contentAlignment: contentAlignmentHorizontalResponsiveBlockQuery(),
  image: imageResponsiveBlockQuery(),
  linkBlock: linkBlockQuery(),
  richtext: textBlockQuery(),
  settings: sectionSettingsBlockQuery(),
  subTitle: titleBlockQuery('subTitle'),
  textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
