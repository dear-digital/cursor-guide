import type { Selection } from 'groqd';

import { q } from 'groqd';

import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';
import { getIntValue } from '../utils';

export const FAQ_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('faqSection'),
  faqs: q('faqs[]', {isArray: true})
    .grab({
      _key: stringQuery(),
      answer: textBlockQuery('answer'),
      id: q.string().nullable(),
      question: [getIntValue('question'), q.string().nullable()],
    })
    .nullable(),
  settings: sectionSettingsBlockQuery(),
  title: titleBlockQuery('title'),
} satisfies Selection;
