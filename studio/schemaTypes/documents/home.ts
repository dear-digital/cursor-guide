import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // @ts-ignore - This is a valid Sanity property
  __experimental_actions: ['create', 'update', 'delete', 'publish'],
  initialValueTemplates: [
    {
      id: 'home',
      title: 'Home',
      schemaType: 'home',
      value: {
        _type: 'home',
        title: 'Home',
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      description: 'Add the sections that make up the homepage',
      type: 'array',
      of: [{type: 'textSection'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'Homepage',
      }
    },
  },
}) 