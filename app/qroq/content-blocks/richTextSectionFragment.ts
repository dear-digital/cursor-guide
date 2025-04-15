import type { Selection } from 'groqd';

import { q, z } from 'groqd';

import { contentAlignmentValues } from '~/lib/utilities/contentAlignment';

import { numberQuery } from '../blocks/number-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';

export const RICHTEXT_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('richtextSection'),
  contentAlignment: z.enum(contentAlignmentValues).nullable(),
  desktopContentAlignment: z.enum(contentAlignmentValues).nullable(),
  maxWidth: numberQuery(),
  richtext: textBlockQuery('richtext'),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
