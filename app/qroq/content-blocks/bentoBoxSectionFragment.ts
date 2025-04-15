import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { headlineBlockQuery } from "../blocks/headlineblock-query";

export const BENTO_BOX_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("bentoBoxSection"),
  colorTheme: colorThemeBlockQuery(),
  headline: headlineBlockQuery(),
  tiles: tilesQuery("tiles"),
} satisfies Selection;

export function tilesQuery(tiles: string) {
  return q(tiles)
    .filter() // This specifies that `tiles` is an array and each item in the array will be processed.
    .grab({
      bigTile: q.boolean(),
      icon: q.string(), // Assuming `iconPartial` resolves to a string
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
      imageBottom: q.boolean(),
      text: q(
        `coalesce(
          text[_key == $language][0].value,
          text[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      title: q(
        `coalesce(
          title[_key == $language][0].value,
          title[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    });
}