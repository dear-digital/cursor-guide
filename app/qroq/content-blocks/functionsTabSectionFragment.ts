import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";

// Fragment for imageResponsiveBlock
export const IMAGE_RESPONSIVE_BLOCK_FRAGMENT = {
  lg: q.object({
    alt: q.string(),
    src: q.string(),
    title: q.string(),
  }).optional(), // lg is optional based on the schema
  sm: q.object({
    alt: q.string(),
    src: q.string(),
    title: q.string(),
  }),
} satisfies Selection;

// Fragment for videoResponsiveBlock
export const VIDEO_RESPONSIVE_BLOCK_FRAGMENT = {
  autoPlay: q.boolean().default(false),
  lg: q.object({
    src: q.string(),
    title: q.string(),
  }).optional(), // lg is optional based on the schema
  sm: q.object({
    src: q.string(),
    title: q.string(),
  }),
} satisfies Selection;

// Fragment for listItemMediaPartial
export const LIST_ITEM_MEDIA_PARTIAL_FRAGMENT = {
  image: q.object(IMAGE_RESPONSIVE_BLOCK_FRAGMENT).optional(),
  video: q.object(VIDEO_RESPONSIVE_BLOCK_FRAGMENT).optional(),
} satisfies Selection;

// Fragment for listItemBlock
export const LIST_ITEM_BLOCK_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("listItem"),
  icon: q.string(),
  id: q.number(),
  isActive: q.boolean().default(false),
  media: q.object(LIST_ITEM_MEDIA_PARTIAL_FRAGMENT), // Updated media fragment
  scrollMax: q.number().optional(),
  scrollMin: q.number().optional(),
  text: q.string(),
  useIcon: q.boolean().default(false),
} satisfies Selection;

// Main Fragment for functionsTabSection
export const FUNCTIONS_TAB_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("functionsTabSection"),
  colorTheme: colorThemeBlockQuery(),
  items: itemsQuery("items"),
  lastLineText: q(
    `coalesce(
      lastLineText[_key == $language][0].value,
      lastLineText[_key == $defaultLanguage][0].value
    )`
  ).nullable(),
} satisfies Selection;

export function itemsQuery(items: string) {
  return q(items)
    .filter()
    .grab({
      description: q(
        `coalesce(
          description[_key == $language][0].value,
          description[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      icon: q.string(),
      id: q.number(),
      isActive: q.boolean().default(false),
      media: q.object(LIST_ITEM_MEDIA_PARTIAL_FRAGMENT), // Updated media fragment
      scrollMax: q.number().optional(),
      scrollMin: q.number().optional(),
      text: q(
        `coalesce(
          text[_key == $language][0].value,
          text[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      useIcon: q.boolean().default(false),
    });
}