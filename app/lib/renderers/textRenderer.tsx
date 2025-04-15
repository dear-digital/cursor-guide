import type {TypeFromSelection} from 'groqd';
import type {PortableTextBlock} from 'sanity';

import {PortableText} from '@portabletext/react';

import {textBlockQuery} from '~/qroq/blocks/text-block-query';

export const textProps = {
  text: textBlockQuery(),
};

export type TextRendererProps = {
  className?: string;
} & TypeFromSelection<typeof textProps>;

export default function TextRenderer(props: {className?: string, data: TextRendererProps}) {
  return (
    <div className={`text-editor text-base lg:text-lg ${props.className}`}>
      <PortableText
        components={{
          marks: {
            em: ({children}) => <em>{children}</em>,
            strong: ({children}) => <strong>{children}</strong>,
            'text-size-base': ({children}) => (
              <span className="text-4xl">{children}</span>
            ),
            'text-size-large': ({children}) => (
              <span className="text-5xl">{children}</span>
            ),
            'text-size-small': ({children}) => (
              <span className="text-3xl">{children}</span>
            ),
            underline: ({children}) => (
              <span className="underline">{children}</span>
            ),
          },
        }}
        value={props.data.text as PortableTextBlock[]}
      />
    </div>
  );
}
