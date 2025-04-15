import type {TypeFromSelection} from 'groqd';

import {getFileAsset} from '@sanity/asset-utils';
import {useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';

import type {SectionDefaultProps} from '~/lib/type';
import type {MEDIA_CONTAINER_CONTENT_FRAGMENT} from '~/qroq/content-blocks/mediaContainerContentFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import {convertToEmbedUrl} from '~/lib/utilities/embedYoutubeUrl';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {useRootLoaderData} from '~/root';

import {Section} from '../layout/Section';

export type MediaContainerSectionProps = TypeFromSelection<
  typeof MEDIA_CONTAINER_CONTENT_FRAGMENT
>;

export function MediaContainerContent(
  props: {
    data: MediaContainerSectionProps;
    theme?: string;
  } & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {inView, ref} = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
        videoRef.current.muted = false;
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [inView]);

  // Get the video URL or YouTube URL
  const video = (data.videoLocalized as any)?.value?.video?.asset
    ? getFileAsset(
        (data.videoLocalized as any)?.value?.video?.asset?.asset?._ref,
        {
          dataset: env.SANITY_STUDIO_DATASET,
          projectId: env.SANITY_STUDIO_PROJECT_ID,
        },
      )
    : null;

  // const youtubeUrl = (data.video as any).video.youtubeUrl;
  const youtubeUrl = (data.videoLocalized as any)?.value?.video?.youtubeUrl;

  return (
    <Section className={`text-theme-${props.theme}`} colorTheme={props.theme}>
      <div className="text-center">
        {/* Render YouTube iframe if youtubeUrl exists */}
        {youtubeUrl && (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mx-auto h-full w-full sm:w-4/5 md:w-3/4 lg:w-2/3"
            loading="lazy"
            src={convertToEmbedUrl(youtubeUrl)}
            title="YouTube video"
          />
        )}
        {/* Render video if present and no YouTube URL */}
        {video && !youtubeUrl && (
          <video
            // autoPlay={data.autoplay ?? false}
            autoPlay={false}
            className="mx-auto w-full"
            controls
            loop
            muted
            ref={(node) => {
              ref(node); // Attach Intersection Observer ref
              videoRef.current = node; // Attach ref to the video element
            }}
            src={video?.url}
          />
        )}

        {/* Render image if no video or YouTube URL */}
        {(data.imageLocalized as any)?.value?.image?.asset?.asset?._ref &&
          !video &&
          !youtubeUrl && (
            <img
              alt="img"
              className="mx-auto w-full"
              src={getImageUrl(
                (data.imageLocalized as any).value?.image?.asset?.asset?._ref,
                env,
                920,
              )}
            />
          )}
        {data.text && (
          <div className="mx-auto mt-16 lg:w-1/2">
            <TextRenderer className="lg:text-3xl" data={{text: data.text}} />
          </div>
        )}
      </div>
    </Section>
  );
}
