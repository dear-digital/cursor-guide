import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { headlineBlockQuery } from "../blocks/headlineblock-query";
import { imageResponsiveBlockQuery } from "../blocks/image-responsive-query";
import { stringQuery } from "../blocks/string-query";
import { textBlockQuery } from "../blocks/text-block-query";

export const IMAGE_CAROUSEL_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('imageCarouselSection'),
  colorTheme: colorThemeBlockQuery(),
  eyecatcher: eyeCatcherQuery(),
  headline: headlineBlockQuery(),
  images: q.array(
    q.object({
      asset: q.object({
        _ref: q.string(),
        _type: q.literal('reference'),
      }).optional(),
      name: q.string().optional(),
      ratio: q.object({
        height: q.number().optional(),
        width: q.number().optional(),
      }).optional(),
    })
  ),
  productImage: imageResponsiveBlockQuery('productImage'),
  showEyeCatcher: q.boolean(),
  text: textBlockQuery('imageCarouselText'),
} satisfies Selection;

export function eyeCatcherQuery() {
  return q('eyecatcher')
    .grab({
      backgroundColor: q.union([
        q.literal("orange"),
        q.literal("yellow"),
        q.literal("red"),
        q.literal("blue"),
        q.literal("purple"),
        q.literal("green"),
      ]).optional(),
      firstLine: q(
        `coalesce(
          firstLine[_key == $language][0].value,
          firstLine[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      rotation: q.union([
        q.literal("none"),
        q.literal("5 degrees"),
        q.literal("-5 degrees"),
      ]).optional(),
      secondLine: q(
        `coalesce(
          secondLine[_key == $language][0].value,
          secondLine[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      size: q.union([
        q.literal("small"),
        q.literal("medium"),
        q.literal("large"),
      ]).optional(),
      thirdLine: q(
        `coalesce(
          thirdLine[_key == $language][0].value,
          thirdLine[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    });
}