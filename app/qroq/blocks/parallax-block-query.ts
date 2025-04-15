import { q } from 'groqd';

import { imageResponsiveBlockQuery } from './image-responsive-query';

export function parallaxBlockQuery(name = 'parallax') {
  return q(name)
    .grab({
      darkMode: q.boolean(),
      logoImage: imageResponsiveBlockQuery('logoImage'),
      productImage: imageResponsiveBlockQuery('productImage'),
    })
    .nullable();
}
