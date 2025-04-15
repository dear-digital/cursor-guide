import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";

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

// Define the fragment for the desktop slides
export const DESKTOP_SLIDES_BLOCK_FRAGMENT = q.object({
  bigImagePosLeft: q.boolean(), // Adjusted property name
  slides: q.object(IMAGE_RESPONSIVE_BLOCK_FRAGMENT), // Adjusted to include the "images" array
});

// Define the fragment for the gallery carousel section
export const GALLERY_CAROUSEL_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("galleryCarouselSection"),
  colorTheme: colorThemeBlockQuery(),
  desktopSlides: q.array(DESKTOP_SLIDES_BLOCK_FRAGMENT),
} satisfies Selection;