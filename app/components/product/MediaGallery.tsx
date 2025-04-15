import {useLoaderData} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen';
import {
  GalleryCarousel,
  GridItem,
  MediaContainer,
  Play,
} from '@vorwerk/fibre-react';
import {useState} from 'react';

import type {loader} from '~/routes/($locale).products.$productHandle';

import {type AspectRatioData, cn} from '~/lib/utils';

import {ShopifyImage} from '../ShopifyImage';

function VideoPlayer({media}: {media: any}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (videoElement: ChildNode | null) => {
    if ((videoElement as HTMLVideoElement)?.paused) {
      if (videoElement) {
        (videoElement as HTMLVideoElement).play();
      }
      setIsPlaying(true);
    } else {
      if (videoElement) {
        (videoElement as HTMLVideoElement).pause();
      }
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        className="h-full w-full object-cover"
        controls={isPlaying}
        poster={media.previewImage?.url || ''}
        preload="metadata"
      >
        {media.sources.map(
          (
            source: {mimeType: string | undefined; url: string | undefined},
            index: null | undefined,
          ) => (
            <source key={index} src={source.url} type={source.mimeType} />
          ),
        )}
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-2xl text-white"
          onClick={(e) => handlePlayPause(e.currentTarget.previousSibling)}
        >
          <Play className="h-20 w-20" />
        </button>
      )}
    </div>
  );
}

export function MediaGallery(props: {aspectRatio?: AspectRatioData}) {
  const {product} = useLoaderData<typeof loader>();
  const medias = product?.media?.nodes.length
    ? flattenConnection(product.media)
    : [];

  // Map Shopify media to desktopSlides format
  const desktopSlides = medias
    .map((media, index) => {
      if (media.__typename === 'MediaImage' && media.image) {
        return {
          bigImagePosLeft: index % 2 === 0,
          images: [
            {
              alt: media.image.altText || `Image ${index + 1}`,
              title: media.image.altText || '',
              url: media.image.url,
            },
          ],
        };
      }
      return null;
    })
    .filter(Boolean); // Remove null entries

  // Map Shopify media to mobileSlides format
  const mobileSlides = [
    {
      mobileCarouselItems: medias
        .filter((media) => media.__typename === 'MediaImage' && media.image)
        .map((media, index) => ({
          alt:
            (media.__typename === 'MediaImage' && media.image?.altText) ||
            `Mobile Image ${index + 1}`,
          title:
            (media.__typename === 'MediaImage' && media.image?.altText) || '',
          url: (media.__typename === 'MediaImage' && media.image?.url) || '',
        })),
    },
  ];

  return (
    <>
      <div className="container lg:px-0 hidden h-full w-full overflow-hidden lg:block">
        {medias[0] && (
          <GridItem className="mb-4" columns={12} key="large-media">
            <div className="product-media-mainblock relative h-full w-full overflow-hidden">
              {medias[0].__typename === 'MediaImage' && medias[0].image && (
                <ShopifyImage
                  aspectRatio={'3/2'}
                  className={cn('h-full w-full object-contain')}
                  data={medias[0].image}
                  fetchpriority="high"
                  loading="eager"
                  lqip={false}
                  sizes="(min-width: 1024px) 100vw"  
                />
              )}
              {medias[0].__typename === 'Video' &&
                medias[0].sources?.length > 0 && (
                  <VideoPlayer media={medias[0]} />
                )}
            </div>
          </GridItem>
        )}

        <div className="grid grid-cols-12 gap-4">
          {medias.slice(1).map((media, index) => (
            <GridItem columns={6} key={index}>
              <div className="relative h-full w-full overflow-hidden">
                <MediaContainer aspectRatio="1/1">
                  {media.__typename === 'MediaImage' && media.image && (
                    <img
                      alt={media.image.altText || ''}
                      className="h-full w-full object-contain"
                      src={media.image.url}
                    />
                  )}
                  {media.__typename === 'Video' &&
                    media.sources?.length > 0 && <VideoPlayer media={media} />}
                </MediaContainer>
              </div>
            </GridItem>
          ))}
        </div>
      </div>
      <div className="-mx-8 lg:hidden gallery-carousel">
        <GalleryCarousel
          desktopSlides={desktopSlides}
          mobileSlides={mobileSlides}
        />
      </div>
    </>
  );
}
