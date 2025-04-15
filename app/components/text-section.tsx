import {PortableText} from '@portabletext/react'
import type {TextSection as TextSectionType} from '../types/sanity'

interface TextSectionProps {
  data: TextSectionType
}

export function TextSection({data}: TextSectionProps) {
  const {eyebrow, title, isHeadingOne, richText} = data

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {eyebrow && (
        <p className="text-sm font-medium text-gray-500 mb-2">{eyebrow}</p>
      )}
      {title && (
        <h2
          className={`text-3xl font-bold text-gray-900 mb-4 ${
            isHeadingOne ? 'text-4xl' : ''
          }`}
        >
          {title}
        </h2>
      )}
      {richText && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={richText} />
        </div>
      )}
    </section>
  )
} 