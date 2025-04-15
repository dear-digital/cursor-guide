import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { headlineBlockQuery } from "../blocks/headlineblock-query";

export const BENTO_CAROUSEL_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("bentoCarouselSection"),
  colorTheme: colorThemeBlockQuery(),
  headline: headlineBlockQuery(),
  slides: slidesQuery("slides"),
}

export function slidesQuery(slides: string) {
  return q(slides)
    .filter()
    .grab({
      tiles: bentoCarouselTilesQuery(),
    });
}

export function bentoCarouselTilesQuery() {
  return q("tiles")
    .filter()
    .grab({
      image: q.object({
        asset: q.object({
          _ref: q.string(),
          _type: q.literal("reference"),
        }).optional(),
        ratio: q.object({
          height: q.number(),
          width: q.number(),
        }).optional(),
      }),
      textBottom: q.boolean().default(false),
      title: q(
        `coalesce(
          title[_key == $language][0].value,
          title[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    });
}