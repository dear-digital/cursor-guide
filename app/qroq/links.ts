import type {Selection} from 'groqd';

import {q} from 'groqd';

/*
|--------------------------------------------------------------------------
| Internal & External Link Fragments
|--------------------------------------------------------------------------
*/
export const LINK_REFERENCE_FRAGMENT = q('link')
  .deref()
  .grab({
    documentType: ['_type', q.string()],
    slug: [
      `coalesce(
        slug,
        store.slug
      )`,
      q.object({
        _type: q.string(),
        current: q.string(),
      }),
    ],
  })
  .nullable();

export const INTERNAL_LINK_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal('internalLink'),
  link: LINK_REFERENCE_FRAGMENT,
  name: q('name').grab({
    _type: q.string(),
    value: q.array(q.string()),
  }),
} satisfies Selection;

export const EXTERNAL_LINK_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal('externalLink'),
  name: q('name').grab({
    _type: q.string(),
    value: q.array(q.string()),
  }),
  openInNewTab: q.boolean().nullable(),
  url: q.string().nullable(),
} satisfies Selection;
  

export const NESTED_NAVIGATION_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal('nestedNavigation'),
  childLinks: q('childLinks[]', {isArray: true}).select({
    '_type == "externalLink"': EXTERNAL_LINK_FRAGMENT,
    '_type == "internalLink"': INTERNAL_LINK_FRAGMENT,
  }),
  link: INTERNAL_LINK_FRAGMENT.link,
  name: INTERNAL_LINK_FRAGMENT.name,
} satisfies Selection;

export const SUB_MENU_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal('subMenu'),
  links: q('links[]', {isArray: true}).select({
    '_type == "externalLink"': EXTERNAL_LINK_FRAGMENT,
    '_type == "internalLink"': INTERNAL_LINK_FRAGMENT,
  }),
} satisfies Selection;

/*
|--------------------------------------------------------------------------
| List of Links
|--------------------------------------------------------------------------
*/
export const LINKS_LIST_SELECTION = {
  '_type == "externalLink"': EXTERNAL_LINK_FRAGMENT,
  '_type == "internalLink"': INTERNAL_LINK_FRAGMENT,
  '_type == "nestedNavigation"': NESTED_NAVIGATION_FRAGMENT,
  '_type == "subMenu"': SUB_MENU_FRAGMENT,
};
