import type { Selection } from "groqd";

import { q } from "groqd";

export const SECTION_NAVIGATOR_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("sectionNavigatorSection"),
  navigationItems: navigationItemsQuery("navigationItems"),
} satisfies Selection;

export function navigationItemsQuery(navigationItems: string) {
  return q(navigationItems)
    .filter()
    .grab({
      id: q.string(),
      label: q(
        `coalesce(
          label[_key == $language][0].value,
          label[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    });
} 