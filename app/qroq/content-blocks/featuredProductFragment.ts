import type {Selection} from 'groqd';

import {q, z} from 'groqd';

import {aspectRatioValues} from '~/lib/utilities/aspectRatio';

import {PRODUCT_RICHTEXT_BLOCKS} from '../blocks';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import {textBlockQuery} from '../blocks/text-block-query';

export const FEATURED_PRODUCT_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('featuredProductSection'),
  mediaAspectRatio: z.enum(aspectRatioValues).nullable(),
  product: q('product')
    .deref()
    .grab({
      store: q('store').grab({
        descriptionHtml: q.string(),
        firstVariant: q('variants[]', {isArray: true})
          .slice(0)
          .deref()
          .grab({
            store: q('store').grab({
              gid: q.string(),
              previewImageUrl: stringQuery(),
              price: q.number(),
            }),
          })
          .nullable(),
        gid: q.string(),
        options: q('options[]', {isArray: true})
          .grab({
            name: q.string(),
            values: q.array(q.string()),
          })
          .nullable(),
        previewImageUrl: stringQuery(),
        title: q.string(),
      }),
    })
    .nullable(),
  richtext: textBlockQuery('richtext'),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
