import type {Selection} from 'groqd';
import {q, z} from 'groqd';
import {contentAlignmentValues} from '~/lib/utilities/contentAlignment';
import {contentPositionValues} from '~/lib/utilities/contentPosition';
import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {BANNER_RICHTEXT_BLOCKS} from '../blocks';
import {IMAGE_FRAGMENT} from '../fragments';

export const IMAGE_BANNER_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageBannerSection'),
  backgroundImage: q('backgroundImage').grab(IMAGE_FRAGMENT).nullable(),
  bannerHeight: numberQuery(),
  content: q(
    `coalesce(
          content[_key == $language][0].value[],
          content[_key == $defaultLanguage][0].value[],
        )[]`,
    {isArray: true},
  )
    .filter()
    .select(BANNER_RICHTEXT_BLOCKS)
    .nullable(),
  contentAlignment: z.enum(contentAlignmentValues).nullable(),
  contentPosition: z.enum(contentPositionValues).nullable(),
  overlayOpacity: numberQuery(),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
