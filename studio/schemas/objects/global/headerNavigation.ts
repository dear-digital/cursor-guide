import { ExternalLink, Link, MenuSquare } from 'lucide-react';
import { defineArrayMember, defineField } from 'sanity';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';

// Internal link definition
export const internalLinkField = defineField({
  name: 'link',
  title: 'Internal Link',
  type: 'reference',
  to: [
    { type: 'home' },
    { type: 'page' },
    { type: 'product' },
    { type: 'collection' },
    { type: 'blogPost' },
  ],
});

// Internal link object
const internalLinkObject = {
  type: 'object',
  name: 'internalLink',
  title: 'Internal Link',
  icon: Link,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayText',
    }),
    internalLinkField,
  ],
};

// External link object
const externalLinkObject = {
  type: 'object',
  name: 'externalLink',
  title: 'External Link',
  icon: ExternalLink,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
    }),
  ],
};

// Sub-item schema (title + links)
const navSubItem = {
  type: 'object',
  name: 'navSubItem',
  title: 'Sub Item',
  fields: [
    defineField({
      name: 'title',
      title: 'Sub Item Title',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember(internalLinkObject),
        defineArrayMember(externalLinkObject),
      ],
    }),
  ],
};

// Navigation menu item schema
const navMenuItem = {
  type: 'object',
  name: 'navMenuItem',
  title: 'Navigation Menu Item',
  icon: MenuSquare,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayText',
    }),
    linkInternationalizedBlock('primaryLink'),
    defineField({
      name: 'subItems',
      title: 'Sub Items',
      type: 'array',
      of: [defineArrayMember(navSubItem)],
    }),
  ],
};

// Header navigation schema
export default defineField({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [defineArrayMember(navMenuItem)],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Navigation',
      };
    },
  },
});
