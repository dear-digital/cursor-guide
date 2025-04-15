import type { TypeFromSelection } from 'groqd';

import { useMemo } from 'react';

import type { SectionDefaultProps } from '~/lib/type';

import type { ButtonBlockProps } from '../sanity/richtext/components/ButtonBlock';
import type { ExternalLinkAnnotationProps } from '../sanity/richtext/components/ExternalLinkAnnotation';
import type { ImageBlockProps } from '../sanity/richtext/components/ImageBlock';
import type { InternalLinkAnnotationProps } from '../sanity/richtext/components/InternalLinkAnnotation';

import { RICHTEXT_SECTION_FRAGMENT } from '~/qroq/content-blocks/richTextSectionFragment';
import { ButtonBlock } from '../sanity/richtext/components/ButtonBlock';
import { ExternalLinkAnnotation } from '../sanity/richtext/components/ExternalLinkAnnotation';
import { ImageBlock } from '../sanity/richtext/components/ImageBlock';
import { InternalLinkAnnotation } from '../sanity/richtext/components/InternalLinkAnnotation';

type RichtextSectionProps = TypeFromSelection<typeof RICHTEXT_SECTION_FRAGMENT>;

export function RichtextSection(
  props: {data: RichtextSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const containerMaxWidth = data.maxWidth;

  const components = useMemo(
    () => ({
      marks: {
        externalLink: (props: {
          children: React.ReactNode;
          value: ExternalLinkAnnotationProps;
        }) => {
          return (
            <ExternalLinkAnnotation {...props.value}>
              {props.children}
            </ExternalLinkAnnotation>
          );
        },
        internalLink: (props: {
          children: React.ReactNode;
          value: InternalLinkAnnotationProps;
        }) => {
          return (
            <InternalLinkAnnotation {...props.value}>
              {props.children}
            </InternalLinkAnnotation>
          );
        },
      },
      types: {
        button: (props: {value: ButtonBlockProps}) => (
          <ButtonBlock {...props.value} />
        ),
        image: (props: {value: ImageBlockProps}) => (
          <ImageBlock containerMaxWidth={containerMaxWidth} {...props.value} />
        ),
      },
    }),
    [containerMaxWidth],
  );

  return (
    <div className="container">

    </div>
  );
}
