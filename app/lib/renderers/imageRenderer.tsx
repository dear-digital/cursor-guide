import type {TypeFromSelection} from 'groqd';

import {SanityImage} from '~/components/sanity/SanityImage';
import {imageResponsiveBlockQuery} from '~/qroq/blocks/image-responsive-query';

export const imageProps = {
  image: imageResponsiveBlockQuery(),
};

export type ImageRendererProps = TypeFromSelection<typeof imageProps>;

export default function ImageRenderer(props: {
  className?: string;
  data: ImageRendererProps;
}) {
  return (
    <SanityImage
      className={props.className} // Passing className to the SanityImage component
      data={props.data}
      decoding="sync"
      draggable={false}
      fetchpriority={'auto'}
      loading={'lazy'}
      sizes="100vw"
    />
  );
}
