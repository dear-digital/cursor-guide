import { q } from "groqd";

import { IMAGE_RESPONSIVE_BLOCK_FRAGMENT } from "../content-blocks/functionsTabSectionFragment";
import { getIntValue } from "../utils";
import { linkBlockQuery } from "./linkblock-query";

export const STICKY_PRODUCT_BAR_FRAGMENT = {
  _key: q.string(),
  _type: q.literal('hero'),
  stickyProductBar: q('stickyProductBar')
    .grab({
      image: q.object(IMAGE_RESPONSIVE_BLOCK_FRAGMENT).optional(),
      linkBlock: linkBlockQuery(),
      showStickyProductBar: q.boolean().nullable(),
      subtitle: [getIntValue('subtitle'), q.string().nullable()],
      title: [getIntValue('title'), q.string().nullable()],
    })
};
