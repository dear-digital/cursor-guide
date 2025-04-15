import type {TypeFromSelection} from 'groqd';

import {stegaClean} from '@sanity/client/stega';

import type {SectionDefaultProps} from '~/lib/type';
import type { VIDEO_SECTION_FRAGMENT } from '~/qroq/content-blocks/videoSectionFragment';

import { VideoRenderer } from '~/components/content-blocks/VideoRenderer';

import {Container} from '../Container';

export type VideoSectionProps = TypeFromSelection<
  typeof VIDEO_SECTION_FRAGMENT
>;

export function VideoSection(
  props: {data: VideoSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const videoWidth = stegaClean(data.videoWidthBlock);

  if (videoWidth === 'full') {
    return <VideoRenderer data={data.video} />;
  }

  return (
    <Container>
      <VideoRenderer data={data.video} />
    </Container>
  );
}
