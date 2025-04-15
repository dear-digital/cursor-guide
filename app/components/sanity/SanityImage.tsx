import type { TypeFromSelection } from 'groqd';
import type { ImageUrlBuilder } from 'sanity';

import { getExtension } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import React from 'react';

import { imageResponsiveBlockQuery } from '~/qroq/blocks/image-responsive-query';
import { useRootLoaderData } from '~/root';

const imageProps = {
  image: imageResponsiveBlockQuery(),
};

export type ImageRendererProps = TypeFromSelection<typeof imageProps>;

export type SanityImageProps = {
  /** The aspect ratio of the image, in the format of `width/height`.
   *
   * @example
   * ```
   * <SanityImage data={image} aspectRatio="4/5" />
   * ```
   */
  className?: string;
  data: ImageRendererProps;
  dataSanity?: string;
  /**
   * Set to `true` to enable LQIP (Low Quality Image Placeholder).
   * The LQIP image is used as a placeholder for images that are too large to load and
   * is cropped to the aspect ratio of the original image.
   * It renders as a blurred background while the original image is loading.
   */
  lqip?: boolean;
} & React.ComponentPropsWithRef<'img'>;

export const SanityImage: React.FC<SanityImageProps> = ({
  className,
  data,
  decoding = 'async',
  loading = 'lazy',
  lqip = false, // @todo - fix this
  sizes,
  style,
  ...passthroughProps
}) => {
  const { env } = useRootLoaderData();

  if (!data || !data.image?.sm?.image?.asset || !env) {
    return null;
  }

  const config = {
    dataset: env.SANITY_STUDIO_DATASET,
    projectId: env.SANITY_STUDIO_PROJECT_ID,
  };

  const smRef = data.image.sm.image.asset._ref;
  const smAspectRatioValues = data.image.sm.ratio ? data.image.sm.ratio.split(':') : undefined;

  const lgData = data.image.lg?.image?.asset ? data.image.lg : data.image.sm;

  const lgRef = lgData.image.asset._ref;
  const lgAspectRatioValues = lgData.ratio ? lgData.ratio.split(':') : undefined;

  // Utility for calculating dimensions
  const getAspectRatioDimensions = (ratioValues: string[] | undefined) => {
    return ratioValues?.length === 2
      ? {
          height: parseFloat(ratioValues[1]),
          width: parseFloat(ratioValues[0]),
        }
      : undefined;
  };

  const smDimensions = getAspectRatioDimensions(smAspectRatioValues);
  const lgDimensions = getAspectRatioDimensions(lgAspectRatioValues);

  const urlBuilder = imageUrlBuilder({
    dataset: config.dataset,
    projectId: config.projectId,
  });

  // Generate URLs for sm and lg
  const smUrl = generateImageUrl({
    aspectRatioHeight: smDimensions?.height,
    aspectRatioWidth: smDimensions?.width,
    ref: smRef,
    urlBuilder,
    width: Math.max(640, 1023), // Typical `sm` width range
  });

  const lgUrl = lgRef
    ? generateImageUrl({
        aspectRatioHeight: lgDimensions?.height,
        aspectRatioWidth: lgDimensions?.width,
        ref: lgRef,
        urlBuilder,
        width: Math.max(1024, 1920), // Typical `lg` width range
      })
    : smUrl; // Fallback to `sm` if `lg` is not available

  // Generate `srcSet` for sm and lg
  const smSrcSet = generateSrcSet({
    aspectRatioHeight: smDimensions?.height,
    aspectRatioWidth: smDimensions?.width,
    breakpoints: [320, 480, 768, 1023], // sm up to 1023px
    ref: smRef,
    urlBuilder,
  });

  const lgSrcSet = lgRef
    ? generateSrcSet({
        aspectRatioHeight: lgDimensions?.height,
        aspectRatioWidth: lgDimensions?.width,
        breakpoints: [1024, 1280, 1536, 1920], // lg starts at 1024px
        ref: lgRef,
        urlBuilder,
      })
    : smSrcSet; // Fallback to `sm` if `lg` is not available

  const blurDataUrl = generateImageUrl({
    aspectRatioHeight: smDimensions?.height,
    aspectRatioWidth: smDimensions?.width,
    blur: 10,
    ref: smRef,
    urlBuilder,
    width: 30,
  });

  if (lqip === false || getExtension(smRef) === 'svg') {
    lqip = false;
  }

  const LQIP =
    lqip &&
    ({
      backgroundImage: `url(${blurDataUrl})`,
      backgroundPositionX: `var(--focalX)`,
      backgroundPositionY: `var(--focalY)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    } as React.CSSProperties);

  return (
    <picture>
      <source
        media="(max-width: 1023px)"
        sizes={sizes || '100vw'}
        srcSet={smSrcSet}
      />
      <source
        media="(min-width: 1024px)"
        sizes={sizes || '100vw'}
        srcSet={lgSrcSet}
      />
      <img
        alt={data.image.sm.image.altText || ''}
        className={className}
        decoding={decoding}
        height={
          lgDimensions?.height || smDimensions?.height
            ? `${(lgDimensions?.height || smDimensions?.height || 1) * 100}`
            : undefined
        }
        loading={loading}
        sizes={sizes || '100vw'}
        src={lgUrl} // Default to larger image if available
        srcSet={lgSrcSet}
        style={
          {
            ...style,
            ...LQIP,
            width: '100%',
          } as React.CSSProperties
        }
        width={
          lgDimensions?.width || smDimensions?.width
            ? `${(lgDimensions?.width || smDimensions?.width || 1) * 100}`
            : undefined
        }
        {...passthroughProps}
      />
    </picture>
  );
};

// Updated `generateImageUrl` to accept `ref`
function generateImageUrl(args: {
  aspectRatioHeight?: number;
  aspectRatioWidth?: number;
  blur?: number;
  ref: string;
  urlBuilder: ImageUrlBuilder;
  width: number;
}) {
  const {
    aspectRatioHeight,
    aspectRatioWidth,
    blur = 0,
    ref,
    urlBuilder,
    width,
  } = args;
  let imageUrl = urlBuilder.image({ _ref: ref }).width(width);
  const imageHeight =
    aspectRatioHeight && aspectRatioWidth
      ? Math.round((width / aspectRatioWidth) * aspectRatioHeight)
      : undefined;

  if (imageHeight) {
    imageUrl = imageUrl.height(imageHeight);
  }

  if (blur && blur > 0) {
    imageUrl = imageUrl.blur(blur);
  }

  return imageUrl.url();
}

// Updated `generateSrcSet` to accept `ref`
function generateSrcSet(args: {
  aspectRatioHeight?: number;
  aspectRatioWidth?: number;
  breakpoints: number[];
  ref: string;
  urlBuilder: ImageUrlBuilder;
}) {
  const { aspectRatioHeight, aspectRatioWidth, breakpoints, ref, urlBuilder } =
    args;

  return breakpoints
    .map((bp) =>
      `${generateImageUrl({
        aspectRatioHeight,
        aspectRatioWidth,
        ref,
        urlBuilder,
        width: bp,
      })} ${bp}w`,
    )
    .join(', ');
}

export function generateSanityImageUrl({
  dataset,
  height,
  projectId,
  ref,
  width,
}: {
  dataset: string;
  height?: number;
  projectId: string;
  ref?: null | string;
  width: number;
}) {
  if (!ref) return null;
  const urlBuilder = imageUrlBuilder({
    dataset,
    projectId,
  })
    .image({
      _ref: ref,
    })
    .auto('format')
    .width(width);

  let imageUrl = urlBuilder.url();

  if (height) {
    imageUrl = urlBuilder.height(height).url();
  }

  return imageUrl;
}

