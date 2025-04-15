import type {TypeFromSelection} from 'groqd';

import type {SectionDefaultProps} from '~/lib/type';
import type {IMAGE_SECTION_FRAGMENT} from '~/qroq/content-blocks/imageSectionFragment';

import ImageRenderer from '~/lib/renderers/imageRenderer';

import {Container} from '../Container';

export type ImageSectionProps = TypeFromSelection<
  typeof IMAGE_SECTION_FRAGMENT
>;

export function ImageSection(
  props: {data: ImageSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  // Helper function to sanitize the input values
  const sanitizeInput = (value: string | undefined) => {
    return value?.replace(/[^\w-]/g, ''); // Remove unexpected characters
  };

  // Sanitize imageWidth
  const imageWidth = sanitizeInput(data.imageWidthBlock);

  if (imageWidth === 'full') {
    return (
      <ImageRenderer className="rounded-base" data={{image: data.image}} />
    );
  }

  return (
    <Container>
      <ImageRenderer className="rounded-base" data={{image: data.image}} />
    </Container>
  );
}
