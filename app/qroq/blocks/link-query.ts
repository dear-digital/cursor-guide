import {q} from 'groqd';

export function linkQuery(name = 'link') {
  return q(name).grab({
    label: q(
      `coalesce(
              link[_key == $language][0].value.label,
              link[_key == $defaultLanguage][0].value.label,
            )`,
    ).nullable(),
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
  });
}
