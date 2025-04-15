import type {InferType} from 'groqd';

import { MediaContainer } from '@vorwerk/fibre-react';
import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player/lazy';

import type {videoResponsiveBlockQuery} from '~/qroq/blocks/video-responsive-block-query';

import {useDevice} from '~/hooks/useDevice';

export type VideoPlayerProps = InferType<
  ReturnType<typeof videoResponsiveBlockQuery>
>;

export function VideoRenderer(props: {data: VideoPlayerProps}) {
  const {data} = props;
  const device = useDevice();

  const autoPlay = data?.autoPlay ?? false;

  const [videoReady, setVideoReady] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [muted, setMuted] = useState(autoPlay);

  // Ensure fallback to `sm` values if `lg` is missing
  const internalVideoUrl =
    device === 'mobile' || !data?.lg?.video?.url // Use `sm` on mobile or if `lg` is missing
      ? data?.sm?.video?.url || ''
      : data?.lg?.video?.url || '';

  const youtubeUrl =
    device === 'mobile' || !data?.lg?.youtubeUrl // Use `sm` on mobile or if `lg` is missing
      ? data?.sm?.youtubeUrl || ''
      : data?.lg?.youtubeUrl || '';

  const externalUrl =
    device === 'mobile' || !data?.lg?.externalUrl // Use `sm` on mobile or if `lg` is missing
      ? data?.sm?.externalUrl || ''
      : data?.lg?.externalUrl || '';

  useEffect(() => {
    if (!videoLoaded) {
      setVideoLoaded(true);
    }
  }, [videoLoaded]);

  // Determine final video URL with priority
  let videoUrl = internalVideoUrl || ''; // Default to internal video URL
  if (youtubeUrl) {
    videoUrl = youtubeUrl;
  } else if (externalUrl) {
    videoUrl = externalUrl;
  }

  return (
    <MediaContainer aspectRatio='n/a'>
      {videoLoaded && (
        <ReactPlayer
          controls={!autoPlay}
          height='100%'
          loop={autoPlay}
          muted={muted}
          onReady={() => setVideoReady(true)}
          playing={autoPlay}
          playsinline
          url={videoUrl}
          width='100%'
        />
      )}
    </MediaContainer>
  );
}
