import { defineField, defineType } from 'sanity';
import { imageBlock } from '../objects/blocks/imageBlock';
import { linkInternationalizedBlock } from '../objects/blocks/linkInternationalizedBlock';

export default defineType({
  name: 'footer',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'Global' },
    { name: 'Main' },
    { name: 'LandingPage' },
    { name: 'Product Stripe' }
  ],
  fields: [
    // Product Stripe Group
    defineField({
      name: 'productStripe',
      title: 'Product Stripe',
      group: 'Product Stripe',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [imageBlock()],
        }),
      ],
    }),

    // Global Group
    defineField({
      name: 'smallLinks',
      title: 'Small Links',
      group: 'Global',
      type: 'array',
      of: [linkInternationalizedBlock()],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      group: 'Global',
      type: 'object',
      fields: [
        defineField({
          name: 'mailchimpId',
          title: 'Mailchimp List ID',
          type: 'internationalizedArrayText',
          description: 'You can find the list ID in the Mailchimp dashboard under Settings of an audience list',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'inputPlaceholder',
          title: 'Input Placeholder',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'internationalizedArrayText',
        }),
      ]
    }),
    defineField({
      name: 'languageSelector',
      title: 'Language Selector',
      group: 'Global',
      type: 'object',
      fields: [
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'modalTitle',
          title: 'Modal Title',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'suggestedLabel',
          title: 'Suggested Label',
          type: 'internationalizedArrayText',
        }),
      ],
    }),

    // Main Group
    defineField({
      name: 'linkGroups',
      title: 'Link Groups',
      group: 'Main',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [linkInternationalizedBlock('linkBlock', true)],
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Link group'
              };
            }
          },
        },
      ],
    }),
    defineField({
      name: 'shopLogos',
      title: 'Shop Logos',
      group: 'Main',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'logos',
              title: 'Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    }),
                    imageBlock('logo'),
                  ],
                },
              ],
            }),
            defineField({
              name: 'bigLogos',
              title: 'Big logos',
              type: 'boolean',
              initialValue: false,
            })
          ],
          preview: {
            prepare({ title }) {
              return {
                title: title || 'Shop Logos',
              };
            }
          }
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      group: 'Main',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'facebook',
              title: 'Facebook',
              type: 'string',
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              type: 'string',
            }),
            defineField({
              name: 'pinterest',
              title: 'Pinterest',
              type: 'string',
            }),
            defineField({
              name: 'youtube',
              title: 'YouTube',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    // Landing Page Group
    defineField({
      name: 'landingPageLinkGroups',
      title: 'Link Groups',
      group: 'LandingPage',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [linkInternationalizedBlock('linkBlock', true)],
            }),
          ],
          preview: {
            prepare() {
              return {
                title: 'Link group'
              };
            }
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer' }),
  },
});
