import type { Selection } from 'groqd';
import { q } from "groqd";
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from "../blocks/string-query";
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';
import { contentAlignmentHorizontalResponsiveBlockQuery } from '../alignment/content-alignment-horizontal-responsive';
import { textAlignmentHorizontalResponsiveBlockQuery } from '../alignment/text-alingment-horizontal-responsive';

export const IMAGE_TEXT_OVERLAY_CAROUSEL_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal("imageTextOverlayCarouselSection"),
  items: q('imageTextOverlayObject[]', { isArray: true })
    .grab({
      _key: stringQuery(),
      _type: q.literal("items"),
      image: imageResponsiveBlockQuery(),
      title: titleBlockQuery(),
      subTitle: titleBlockQuery('subTitle'),
      richtext: textBlockQuery(),
      linkBlock: linkBlockQuery(),
      bowPosition: q.string(),
      contentAlignment: contentAlignmentHorizontalResponsiveBlockQuery(),
      textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
    }),
  settings: sectionSettingsBlockQuery(),
} satisfies Selection;
