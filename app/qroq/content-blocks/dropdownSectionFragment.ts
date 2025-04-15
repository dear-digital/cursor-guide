import type { Selection } from 'groqd';

import { q } from 'groqd';

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';

export const DROPDOWN_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('dropdownSection'),
  colorTheme: colorThemeBlockQuery(),
  faqs: q('faqs[]', { isArray: true })
    .grab({
      _key: stringQuery(),
      answer: textBlockQuery('answer'),
      id: q.string().nullable(),
      question: q(
        `coalesce(
          question[_key == $language][0].value,
          question[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    })
    .nullable(),
  headline: headlineBlockQuery(),
  showLessText: q(
    `coalesce(
        showLessText[_key == $language][0].value,
        showLessText[_key == $defaultLanguage][0].value
      )`
  ).nullable(),
  showMoreOption: q.boolean().optional().default(true),
  showMoreText: q(
    `coalesce(
        showMoreText[_key == $language][0].value,
        showMoreText[_key == $defaultLanguage][0].value
      )`
  ).nullable(),
  title: q(
    `coalesce(
        title[_key == $language][0].value,
        title[_key == $defaultLanguage][0].value
      )`
  ).nullable(),
} satisfies Selection; 