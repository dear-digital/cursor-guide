import type {Selection} from 'groqd';

import {q} from 'groqd';

import {booleanQuery} from '../blocks/boolean-query';
import {numberQuery} from '../blocks/number-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {IMAGE_FRAGMENT} from '../fragments';
import {getIntValue} from '../utils';

export const CAROUSEL_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('carouselSection'),
  arrows: booleanQuery(),
  autoplay: booleanQuery(),
  loop: booleanQuery(),
  pagination: booleanQuery(),
  settings: sectionSettingsBlockQuery(),
  slides: q('slides[]', {isArray: true})
    .grab({
      _key: q.string(),
      image: q('image').grab(IMAGE_FRAGMENT).nullable(),
    })
    .nullable(),
  slidesPerViewDesktop: numberQuery(),
  title: [getIntValue('heading'), q.string()],
} satisfies Selection;
