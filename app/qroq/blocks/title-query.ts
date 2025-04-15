import { q } from 'groqd';

import { textSizeQuery } from './partial/text-size-query';
import { textBlockQuery } from './text-block-query';

export function titleBlockQuery(name = 'title') {
  return q(name).grab({
    textSize: textSizeQuery(),
    title: textBlockQuery('title'),
  });
}
