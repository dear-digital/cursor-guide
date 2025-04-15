import type { TypeFromSelection } from 'groqd';
import type { PortableTextBlock } from 'sanity';

import { PortableText } from '@portabletext/react';

import { titleBlockQuery } from '~/qroq/blocks/title-query';

export const titleProps = {
  title: titleBlockQuery(),
};

export type HeroTitleRendererProps = TypeFromSelection<typeof titleProps>;

export default function HeroTitleRenderer(props: { data: HeroTitleRendererProps }) {
  return (
    <PortableText
      components={{
        block: {
          // Override the default block renderer to always render an h1
          normal: ({ children }) => <h1 className='text-5xl md:text-6xl xl:text-7xl'>{children}</h1>,
        },
        marks: {
          em: ({ children }) => <em>{children}</em>,
          strong: ({ children }) => <strong>{children}</strong>,
          'text-size-base': ({ children }) => <span>{children}</span>,
          'text-size-large': ({ children }) => <span>{children}</span>,
          'text-size-small': ({ children }) => <span>{children}</span>,
          underline: ({ children }) => <span className="underline">{children}</span>,
        },
      }}
      value={props.data.title.title as PortableTextBlock[]}
    />
  );
}
