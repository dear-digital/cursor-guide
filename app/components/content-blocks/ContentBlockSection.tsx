import type {TypeFromSelection} from 'groqd';

import {ContentBlock, Headline} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {CONTENT_BLOCK_SECTION_FRAGMENT} from '~/qroq/content-blocks/contentBlockFragment';

import ButtonGroupRenderer from '~/lib/renderers/buttonGroupRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {useRootLoaderData} from '~/root';

import {Section} from '../layout/Section';
import {VideoRenderer} from './VideoRenderer';

export type ContentBlockSectionProps = TypeFromSelection<
  typeof CONTENT_BLOCK_SECTION_FRAGMENT
>;

export function ContentBlockSection(
  props: {data: ContentBlockSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const {env} = useRootLoaderData();

  const mobileImage = data.image?.sm?.image?._ref
    ? getImageUrl(data.image.sm.image._ref, env)
    : '';
  const desktopImage = data.image?.lg?.image?._ref
    ? getImageUrl(data.image.lg.image._ref, env)
    : mobileImage;

  // Check if video is provided
  const hasVideo =
    data.videoBlock &&
    (data.videoBlock.sm?.video?.url ||
      data.videoBlock.sm?.youtubeUrl ||
      data.videoBlock.sm?.externalUrl ||
      data.videoBlock.lg?.video?.url ||
      data.videoBlock.lg?.youtubeUrl ||
      data.videoBlock.lg?.externalUrl);

  return (
    <div id={data.id}>
      <Section
        className={`text-theme-${data.colorTheme}`}
        colorTheme={data.colorTheme}
      >
        <ContentBlock
          buttonGroup={
            <ButtonGroupRenderer buttonGroup={{buttonGroup: data.linksBlock}} />
          }
          headline={
            data.headline ? (
              <Headline
                children={
                  <TitleRenderer data={{title: data.headline?.headline}} />
                }
                eyebrowLine={data.headline.eyebrowline as React.ReactNode}
                spaceBelow={data.headline.spaceBelow}
                strongColor={data.headline.strongColor}
                subline={
                  <TextRenderer
                    className="subline-text leading-12 lg:text-sm"
                    data={{text: data.headline.subline}}
                  />
                }
              />
            ) : (
              <></>
            )
          }
          layout={data.layout}
          media={
            hasVideo ? (
              <VideoRenderer data={data.videoBlock} />
            ) : (
              <img alt="img" src={desktopImage} />
            )
          }
          mediaAlignment={data.mediaAlignment}
          paragraph={<TextRenderer data={{text: data.text}} />}
        />
      </Section>
    </div>
  );
}
