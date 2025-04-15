import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const textSection = defineType({
  type: 'object',
  name: 'textSection',
  title: 'Text Section',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the section',
      type: 'string',
    }),
    defineField({
      name: 'isHeadingOne',
      title: 'Is it a <h1>?',
      type: 'boolean',
      description:
        'By default the title is a <h2> tag. If you use this as the top block on the page, you can toggle this on to make it a <h1> instead',
      initialValue: false,
    }),
    defineField({
      name: 'richText',
      title: 'Rich Text',
      description: 'Large body of text that has links, ordered/unordered lists and headings.',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({title, eyebrow}) {
      return {
        title: title || 'Text Section',
        subtitle: eyebrow,
      }
    },
  },
}) 