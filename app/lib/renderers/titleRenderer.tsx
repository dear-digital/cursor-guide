import type {TypeFromSelection} from 'groqd';
import type {PortableTextBlock} from 'sanity';

import {PortableText} from '@portabletext/react';

import {titleBlockQuery} from '~/qroq/blocks/title-query';

export const titleProps = {
  title: titleBlockQuery(),
};

export type TitleRendererProps = TypeFromSelection<typeof titleProps>;

// Define custom classes for each text size
const textSizes = {
  base: 'text-2xl lg:text-6xl',
  large: 'text-4xl lg:text-8xl',
  small: 'text-xl lg:text-5xl leading-6 lg:leading-9',
};

export default function TitleRenderer(props: {data: TitleRendererProps}) {
  const getClassForSize = (size: null | string) => {
    // Check if the size is a valid key in textSizes and return the corresponding class
    return textSizes[size as keyof typeof textSizes] || '';
  };

  return (
    <div className='text-editor'>
      <PortableText
        components={{
          block: {
            h1: ({children}) => (
              <h1 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h1>
            ),
            h2: ({children}) => (
              <h2 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h2>
            ),
            h3: ({children}) => (
              <h3 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h3>
            ),
            h4: ({children}) => (
              <h4 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h4>
            ),
            h5: ({children}) => (
              <h5 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h5>
            ),
            h6: ({children}) => (
              <h6 className={getClassForSize(props.data.title.textSize)}>
                {children}
              </h6>
            ),
          },
          marks: {
            em: ({children}) => <em>{children}</em>,
            strong: ({children}) => <strong>{children}</strong>,
            'text-size-base': ({children}) => (
              <span className={textSizes.base}>{children}</span>
            ),
            'text-size-large': ({children}) => (
              <span className={textSizes.large}>{children}</span>
            ),
            'text-size-small': ({children}) => (
              <span className={textSizes.small}>{children}</span>
            ),
            underline: ({children}) => (
              <span className="underline">{children}</span>
            ),
          },
        }}
        value={props.data.title.title as PortableTextBlock[]}
      />
    </div>
  );
}
