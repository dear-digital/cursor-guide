import type {PortableTextBlock} from '@portabletext/types'

export interface TextSection {
  _type: 'textSection'
  eyebrow?: string
  title?: string
  isHeadingOne?: boolean
  richText?: PortableTextBlock[]
} 