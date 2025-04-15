import { q } from 'groqd';

import { linkBlockQuery } from './blocks/linkblock-query';
import { COLLECTION_SECTIONS_FRAGMENT } from './content-blocks/collectionSectionsFragment';
import { PRODUCT_SECTIONS_FRAGMENT } from './content-blocks/productSectionsFragment';
import { CONTENT_BLOCKS_FRAGMENT } from './content-blocks/sectionsFragment';
import {
  ANNOUNCEMENT_BAR_ARRAY_FRAGMENT,
  ANNOUNCEMENT_BAR_FRAGMENT,
  COLOR_SCHEME_FRAGMENT,
  FONT_FRAGMENT,
  IMAGE_FRAGMENT,
  SETTINGS_FRAGMENT,
} from './fragments';
import { HERO_BLOCKS_FRAGMENT } from './hero-blocks/heroBlocksFragment';
import { THEME_CONTENT_FRAGMENT } from './themeContent';
import { getIntValue } from './utils';

/*
|--------------------------------------------------------------------------
| Template Queries
|--------------------------------------------------------------------------
*/
export const DEFAULT_PRODUCT_TEMPLATE = q('*')
  .filter("_type == 'productTemplate' && default == true")
  .grab({
    _type: q.literal('productTemplate'),
    name: q.string().nullable(),
    sections: PRODUCT_SECTIONS_FRAGMENT,
  })
  .slice(0)
  .nullable();

export const DEFAULT_COLLECTION_TEMPLATE = q('*')
  .filter("_type == 'collectionTemplate' && default == true")
  .grab({
    _type: q.literal('collectionTemplate'),
    name: q.string().nullable(),
    sections: COLLECTION_SECTIONS_FRAGMENT,
  })
  .slice(0)
  .nullable();

/*
|--------------------------------------------------------------------------
| Page Query
|--------------------------------------------------------------------------
*/
export const PAGE_QUERY = q('*')
  .filter(
    `(
    _type == "page" &&
    slug[_key == $locale][0].value.current == $handle
  ) || (
    _type == "home" &&
    $handle == "home"
  )`,
  )
  .grab({
    _type: q.literal('page').or(q.literal('home')),
    contentBlocks: CONTENT_BLOCKS_FRAGMENT,
    darkMode: q.boolean().default(false),
    heroBlocks: HERO_BLOCKS_FRAGMENT,
    isLandingPage: q.boolean().default(false),
    seo: q('seo')
      .grab({
        description: [getIntValue('description'), q.string().nullable()],
        image: q('image').grab(IMAGE_FRAGMENT).nullable(),
        title: [getIntValue('title'), q.string().nullable()],
      })
      .nullable(),
  })
  .slice(0)
  .nullable();
/*
|--------------------------------------------------------------------------
| Storefront (dynamic) Query
|--------------------------------------------------------------------------
*/

export function STOREFRONT_PAGE_QUERY(storefront: string) {
  return q('*')
    .filter(
      `(
        _type == "${storefront}" &&
        slug[_key == $locale][0].value.current == $handle
      )`,
    )
    .grab({
      _type: q.literal('page').or(q.literal('home')).or(q.literal(storefront)),
      contentBlocks: CONTENT_BLOCKS_FRAGMENT,
      heroBlocks: HERO_BLOCKS_FRAGMENT,
      seo: q('seo')
        .grab({
          description: [getIntValue('description'), q.string().nullable()],
          image: q('image').grab(IMAGE_FRAGMENT).nullable(),
          title: [getIntValue('title'), q.string().nullable()],
        })
        .nullable(),
      slug: q('slug').grab({ current: q.string() }), // Ensure slug is fetched for all types
      title: [getIntValue('title'), q.string().nullable()],
    })
    .slice(0)
    .nullable();
}

/*
|--------------------------------------------------------------------------
| Product Query
|--------------------------------------------------------------------------
*/
export const PRODUCT_QUERY = q('').grab({
  _type: ['"product"', q.literal('product')],
  defaultProductTemplate: DEFAULT_PRODUCT_TEMPLATE,
  product: q('*')
    .filter(`_type == "product" && store.slug.current == $productHandle`)
    .grab({
      store: q('store').grab({
        gid: q.string(),
      }),
      template: q('template').deref().grab({
        sections: PRODUCT_SECTIONS_FRAGMENT,
      }),
    })
    .slice(0)
    .nullable(),
});

/*
|--------------------------------------------------------------------------
| Collection Query
|--------------------------------------------------------------------------
*/
export const COLLECTION_QUERY = q('').grab({
  _type: ['"collection"', q.literal('collection')],
  collection: q('*')
    .filter(`_type == "collection" && store.slug.current == $collectionHandle`)
    .grab({
      store: q('store').grab({
        gid: q.string(),
      }),
      template: q('template').deref().grab({
        sections: COLLECTION_SECTIONS_FRAGMENT,
      }),
    })
    .slice(0)
    .nullable(),
  defaultCollectionTemplate: DEFAULT_COLLECTION_TEMPLATE,
});

/*
|--------------------------------------------------------------------------
| CMS Settings Queries
|--------------------------------------------------------------------------
*/
export const FONTS_QUERY = q('*')
  .filter("_type == 'typography'")
  .grab({
    body: q('body').grab(FONT_FRAGMENT),
    extra: q('extra').grab(FONT_FRAGMENT),
    heading: q('heading').grab(FONT_FRAGMENT),
  })
  .order('_createdAt asc')
  .slice(0)
  .nullable();

export const DEFAULT_COLOR_SCHEME_QUERY = q('*')
  .filter("_type == 'colorScheme' && default == true")
  .grab(COLOR_SCHEME_FRAGMENT)
  .slice(0)
  .nullable();

export const SETTINGS_QUERY = q('*')
  .filter("_type == 'settings'")
  .grab(SETTINGS_FRAGMENT)
  .slice(0)
  .nullable();

export const HEADER_QUERY = q('*')
  .filter("_type == 'header'")
  .grab({
    announcement: ANNOUNCEMENT_BAR_FRAGMENT,
    menu: q('menu').grab({
      items: q('items[]', { isArray: true }).grab({
        link: linkBlockQuery('primaryLink', true),
        subItems: q('subItems[]', { isArray: true }).grab({
          links: q('links[]', { isArray: true }).grab({
            _type: q.string(),
            link: q('link')
              .deref()
              .grab({
                anchor: q.string().nullable(),
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
                ]
              })
              .nullable(),
            name: q(
              `coalesce(
                ${'name'}[_key == $language][0].value,
                ${'name'}[_key == $defaultLanguage][0].value
              )`,
            ).nullable(),
            openInNewTab: q.boolean().nullable(),
            url: q.string().nullable(),
          }),
          title: q(
            `coalesce(
              ${'title'}[_key == $language][0].value,
              ${'title'}[_key == $defaultLanguage][0].value
            )`,
          ).nullable(),
        }),
        title: q(
          `coalesce(
            ${'title'}[_key == $language][0].value,
            ${'title'}[_key == $defaultLanguage][0].value
          )`,
        ).nullable(),
      }),
    }),
  })
  .slice(0)
  .nullable();

  export const FOOTER_QUERY = q('*')
  .filter("_type == 'footer'")
  .grab({
    landingPageLinkGroups: q('landingPageLinkGroups[]', { isArray: true })
      .grab({
        links: q('links[]', { isArray: true }).grab({
          label: q(
            `coalesce(
              link[_key == $language][0].value.label,
              link[_key == $defaultLanguage][0].value.label
            )`
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
        }),
        title: q(
          `coalesce(
            title[_key == $language][0].value,
            title[_key == $defaultLanguage][0].value
          )`
        ).nullable(),
      })
      .nullable(),
    languageSelector: q('languageSelector').grab({
      buttonLabel: q(
        `coalesce(
          buttonLabel[_key == $language][0].value,
          buttonLabel[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      modalTitle: q(
        `coalesce(
          modalTitle[_key == $language][0].value,
          modalTitle[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      suggestedLabel: q(
        `coalesce(
          suggestedLabel[_key == $language][0].value,
          suggestedLabel[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    }),
    // Main Group
    linkGroups: q('linkGroups[]', { isArray: true })
      .grab({
        links: q('links[]', { isArray: true }).grab({
          label: q(
            `coalesce(
              link[_key == $language][0].value.label,
              link[_key == $defaultLanguage][0].value.label
            )`
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
        }),
        title: q(
          `coalesce(
            title[_key == $language][0].value,
            title[_key == $defaultLanguage][0].value
          )`
        ).nullable(),
      })
      .nullable(),
    newsletter: q('newsletter').grab({
      buttonText: q(
        `coalesce(
          buttonText[_key == $language][0].value,
          buttonText[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      inputPlaceholder: q(
        `coalesce(
          inputPlaceholder[_key == $language][0].value,
          inputPlaceholder[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      mailchimpId: q(
        `coalesce(
          mailchimpId[_key == $language][0].value,
          mailchimpId[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      successMessage: q(
        `coalesce(
          successMessage[_key == $language][0].value,
          successMessage[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
      title: q(
        `coalesce(
          title[_key == $language][0].value,
          title[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    }),
    // Product Stripe Group
    productStripe: q('productStripe').grab({
      images: q('images[]', { isArray: true }).grab(IMAGE_FRAGMENT),
      title: q(
        `coalesce(
          title[_key == $language][0].value,
          title[_key == $defaultLanguage][0].value
        )`
      ).nullable(),
    }),
    shopLogos: q('shopLogos[]', { isArray: true })
      .grab({
        bigLogos: q.boolean().default(false),
        logos: q('logos[]', { isArray: true }).grab({
          caption: q.string().nullable(),
          image: q('logo').grab(IMAGE_FRAGMENT).nullable(),
        }),
        title: q(
          `coalesce(
            title[_key == $language][0].value,
            title[_key == $defaultLanguage][0].value
          )`
        ).nullable(),
      })
      .nullable(),
    // Global Group
    smallLinks: q('smallLinks[]', { isArray: true })
      .grab({
        label: q(
          `coalesce(
            link[_key == $language][0].value.label,
            link[_key == $defaultLanguage][0].value.label
          )`
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
      })
      .nullable(),
    socialLinks: q('socialLinks[]', { isArray: true })
      .grab({
        facebook: q.string().nullable(),
        instagram: q.string().nullable(),
        pinterest: q.string().nullable(),
        title: q.string().nullable(),
        youtube: q.string().nullable(),
      }),
  })
  .slice(0)
  .nullable();

export const THEME_CONTENT_QUERY = q('*')
  .filter("_type == 'themeContent'")
  .grab(THEME_CONTENT_FRAGMENT)
  .slice(0)
  .nullable();

export const ROOT_QUERY = q('')
  .grab({
    _type: ['"root"', q.literal('root')],
    defaultColorScheme: DEFAULT_COLOR_SCHEME_QUERY,
    fonts: FONTS_QUERY,
    footer: FOOTER_QUERY,
    header: HEADER_QUERY,
    settings: SETTINGS_QUERY,
    themeContent: THEME_CONTENT_QUERY,
  })
  .nullable();
