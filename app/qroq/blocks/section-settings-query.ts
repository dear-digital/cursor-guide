import { q } from 'groqd';

import { COLOR_SCHEME_FRAGMENT } from '../fragments';

export function sectionSettingsBlockQuery(name = 'sectionSettingsBlock') {
  return q(name)
    .grab({
      colorScheme: q('colorScheme').deref().grab(COLOR_SCHEME_FRAGMENT),
      customCss: q
        .object({
          code: q.string().optional(),
        })
        .nullable(),
      hide: q.boolean().nullable(),
      padding: q
        .object({
          bottom: q.string().default('base'),
          top: q.string().default('base'),
        })
    })
    .nullable();
}
