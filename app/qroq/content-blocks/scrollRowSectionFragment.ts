import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";

export const SCROLL_ROW_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("scrollRowSection"),
  colorTheme: colorThemeBlockQuery(),
  items: itemsQuery("items"),
} satisfies Selection;

export function itemsQuery(items: string) {
  return q(items)
    .filter()
    .grab({
      icon: q.string(),
      text: q(
        `coalesce(
          text[_key == $language][0].value,
          text[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    });
}
