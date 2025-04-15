import type { Selection } from 'groqd';

import { q } from 'groqd';

import { imageResponsiveBlockQuery } from '~/qroq/blocks/image-responsive-query';
import { linkBlockQuery } from '~/qroq/blocks/linkblock-query';
import { sectionSettingsBlockQuery } from '~/qroq/blocks/section-settings-query';
import { stringQuery } from '~/qroq/blocks/string-query';
import { textBlockQuery } from '~/qroq/blocks/text-block-query';

import { contentAlignmentHorizontalResponsiveBlockQuery } from '../alignment/content-alignment-horizontal-responsive';
import { textAlignmentHorizontalResponsiveBlockQuery } from '../alignment/text-alingment-horizontal-responsive';
import { titleBlockQuery } from '../blocks/title-query';

export const IMAGE_TEXT_OVERLAY_HERO_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageTextOverlayHero'),
  contentAlignment: contentAlignmentHorizontalResponsiveBlockQuery(),
  image: imageResponsiveBlockQuery(),
  link: linkBlockQuery(),
  settings: sectionSettingsBlockQuery(),
  text: textBlockQuery(),
  textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
