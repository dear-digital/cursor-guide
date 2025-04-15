import type {Selection} from 'groqd';

import {q} from 'groqd';

import {imageResponsiveBlockQuery} from '../blocks/image-responsive-query';
import {linkBlockQuery} from '../blocks/linkblock-query';
import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import {textBlockQuery} from '../blocks/text-block-query';
import {titleBlockQuery} from '../blocks/title-query';

export const IMAGE_TEXT_OVERLAY_CARD_CAROUSEL_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageTextOverlayCardCarouselSection'),
  buttonLinkBlock: linkBlockQuery('ButtonlinkBlock'),
  cards: q('imageTextOverlayCardObject[]', {isArray: true})
    .grab({
      _key: stringQuery(),
      image: imageResponsiveBlockQuery(),
      link: linkBlockQuery(),
      overlayText: textBlockQuery('overlayText'),
      text: textBlockQuery(),
    })
    .nullable(),
  link: linkBlockQuery(),
  settings: sectionSettingsBlockQuery(),
  text: textBlockQuery(),
  title: titleBlockQuery(),
} satisfies Selection;
