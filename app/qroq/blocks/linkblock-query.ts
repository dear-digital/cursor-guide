import { q } from 'groqd';

export function linkBlockQuery(name = 'linkBlock', noLocale = false) {
  return q(name)
    .grab({
      disabled: q.boolean().nullable(),

      icon: q.string().nullable(),

      iconPosition: q.union([q.literal('left'), q.literal('right')]),
      invertColors: q.boolean().default(false),

      label: q(
        `coalesce(
            link[_key == $language][0].value.label,
            link[_key == $defaultLanguage][0].value.label,
          )`,
      ).nullable(),

      size: q.union([
        q.literal('small'),
        q.literal('medium'),
        q.literal('large'),
      ]),
      style: q
        .union([
          q.literal('transparent'),
          q.literal('primary'),
          q.literal('secondary'),
          q.literal('tertiary'),
        ])
        .default('primary'),

      url: q(`link[_key == $language][0].value.link`)
        .grab({
          externalLink: q.string().nullable(),
          internalLink: q('internalLinkPartial')
            .deref()
            .grab({
              documentType: ['_type', q.string()],
              slug: [
                `coalesce(
                      slug[_key == $language][0].value,
                      slug[_key == $defaultLanguage][0].value
                    )`,
                q.object({
                  _type: q.string(),
                  current: q.string(),
                }),
              ],
            })
            .nullable(),
        })
        .nullable(),
    })
    .nullable();
}
