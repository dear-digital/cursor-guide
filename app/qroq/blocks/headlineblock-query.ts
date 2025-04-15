import { q } from 'groqd';

import { textBlockQuery } from './text-block-query';
import { titleBlockQuery } from './title-query';

export function headlineBlockQuery(name = 'headlineBlock') {
  return q(name)
    .grab({
      eyebrowline: q(
        `coalesce(
          eyebrowline[_key == $language][0].value,
          eyebrowline[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      headline: titleBlockQuery('headline'),
      spaceBelow: q.literal("default"),
      strongColor: q.literal("green"),
      subline: textBlockQuery('richSubline'),
    })
    .nullable();
}