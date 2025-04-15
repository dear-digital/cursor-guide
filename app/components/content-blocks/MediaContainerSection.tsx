import type {TypeFromSelection} from 'groqd';

import {getFileAsset} from '@sanity/asset-utils';
import {Headline, MediaContainer} from '@vorwerk/fibre-react';
import {useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';

import type {SectionDefaultProps} from '~/lib/type';
import type {MEDIA_CONTAINER_SECTION_FRAGMENT} from '~/qroq/content-blocks/mediaContainerSectionFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {convertToEmbedUrl} from '~/lib/utilities/embedYoutubeUrl';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import Container from '../Container';
import {Section} from '../layout/Section';

export type MediaContainerSectionProps = TypeFromSelection<
  typeof MEDIA_CONTAINER_SECTION_FRAGMENT
>;

export function MediaContainerSection(
  props: {data: MediaContainerSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

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

  // Get the video asset if available
  const video = (data.videoLocalized as any)?.value?.video?.asset
    ? getFileAsset(
        (data.videoLocalized as any)?.value?.video?.asset?.asset?._ref,
        {
          dataset: env.SANITY_STUDIO_DATASET,
          projectId: env.SANITY_STUDIO_PROJECT_ID,
        },
      )
    : null;

  // Get the YouTube URL if available
  const youtubeUrl = (data.videoLocalized as any)?.value?.video?.youtubeUrl;
  // Get the external URL if available
  const externalUrl = (data.videoLocalized as any)?.value?.video?.externalUrl;

  return (
    <Section className={`text-theme-${theme}`} colorTheme={theme}>
      <Container>
        <MediaContainer aspectRatio="21/9">
          <div className="text-center">
            {data.headline?.headline && (
              <div className="mb-8">
                <Headline
                  children={
                    <TitleRenderer data={{title: data.headline.headline}} />
                  }
                  eyebrowLine={data.headline.eyebrowline as string}
                  spaceBelow={data.headline.spaceBelow}
                  strongColor={data.headline.strongColor}
                  subline={
                    <TextRenderer
                      className="subline-text leading-12 lg:text-sm"
                      data={{text: data.headline.subline}}
                    />
                  }
                />
              </div>
            )}

            {/* Render YouTube iframe if youtubeUrl exists */}
            {youtubeUrl && (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mx-auto w-full"
                height="120%"
                loading="lazy"
                src={convertToEmbedUrl(youtubeUrl)}
                title="YouTube video"
              />
            )}

            {/* Render external video iframe if externalUrl exists and no youtubeUrl */}
            {!youtubeUrl && externalUrl && (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mx-auto w-full"
                height="120%"
                loading="lazy"
                src={externalUrl}
                title="External video"
              />
            )}

            {/* Render video element if file asset exists and no youtubeUrl/externalUrl */}
            {video && !youtubeUrl && !externalUrl && (
              <video
                autoPlay={false}
                className="mx-auto"
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

            {/* Render image if no video, YouTube, or external URL */}
            {(data.imageLocalized as any)?.value?.image?.asset?.asset?._ref &&
              !video &&
              !youtubeUrl &&
              !externalUrl && (
                <img
                  alt="img"
                  className="mx-auto"
                  src={getImageUrl(
                    (data.imageLocalized as any).value?.image?.asset?.asset?._ref,
                    env,
                    920,
                  )}
                />
              )}
            {data.text && (
              <div className="mx-auto my-8 lg:w-2/3">
                <TextRenderer
                  className="subline-text leading-12 lg:text-sm"
                  data={{text: data.text}}
                />
              </div>
            )}
          </div>
        </MediaContainer>
      </Container>
    </Section>
  );
}
