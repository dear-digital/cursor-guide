import type {Selection} from 'groqd';

import {q, z} from 'groqd';

import {aspectRatioValues} from '~/lib/utilities/aspectRatio';

import {PRODUCT_RICHTEXT_BLOCKS} from '../blocks';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {textBlockQuery} from '../blocks/text-block-query';

export const PRODUCT_INFORMATION_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('productInformationSection'),
  desktopMediaPosition: z.enum(['left', 'right']).nullable(),
  desktopMediaWidth: z.enum(['small', 'medium', 'large']).nullable(),
  mediaAspectRatio: z.enum(aspectRatioValues).nullable(),
  richtext: q(
    `coalesce(
      richtext[_key == $language][0].value[],
      richtext[_key == $defaultLanguage][0].value[],
    )[]`,
    {isArray: true},
  )
    .filter()
    .select(PRODUCT_RICHTEXT_BLOCKS)
    .nullable(),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
