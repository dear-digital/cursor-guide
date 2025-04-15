import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'

export const client = createClient({
  projectId: 'fd7ln89k',
  dataset: 'production',
  apiVersion: '2024-04-15',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source)
} 