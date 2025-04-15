import type { Selection } from "groqd";

import { q } from "groqd";

import { colorThemeBlockQuery } from "../blocks/color-theme-query";
import { linksBlockQuery } from "../blocks/linksblock-query";
import { stringQuery } from "../blocks/string-query";
import { textBlockQuery } from "../blocks/text-block-query";
import { titleBlockQuery } from "../blocks/title-query";

export const HEADLINE_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal("headlineSection"),
  colorTheme: colorThemeBlockQuery(),
  eyebrowline: q(
    `coalesce(
      eyebrowline[_key == $language][0].value,
      eyebrowline[_key == $defaultLanguage][0].value
    )`
  ).nullable(),
  headline: titleBlockQuery('headline'),
  linksBlock: linksBlockQuery(),
  socialLinks: q('socialLinks').grab({
    facebook: q.string().nullable(),
    messenger: q.string().nullable(),
    telegram: q.string().nullable(),
    whatsapp: q.string().nullable(),
    x: q.string().nullable(),
  }).nullable(),
  spaceBelow: q.literal("default"),
  strongColor: q.literal("green"),
  subline: textBlockQuery('richSubline'),
} satisfies Selection;