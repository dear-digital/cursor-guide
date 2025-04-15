import { q } from 'groqd';

import { RICHTEXT_BLOCKS } from '../blocks';

export function textBlockQuery(name = 'textBlock') {
  return q(
    `coalesce(
        ${name}[_key == $language][0].value[],
        ${name}[_key == $defaultLanguage][0].value[],
      )[]`,
    {isArray: true},
  )
    .filter()
    .select(RICHTEXT_BLOCKS)
    .nullable();
}
