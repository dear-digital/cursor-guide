import type {TypeFromSelection} from 'groqd';

import {getFileAsset} from '@sanity/asset-utils';
import {FunctionsTab} from '@vorwerk/fibre-react';
import {domAnimation, LazyMotion} from 'framer-motion';

import type {SectionDefaultProps} from '~/lib/type';
import type {FUNCTIONS_TAB_SECTION_FRAGMENT} from '~/qroq/content-blocks/functionsTabSectionFragment';

import IconRenderer from '~/lib/renderers/iconRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import Container from '../Container';
import {Section} from '../layout/Section';

export type FunctionsTabSectionProps = TypeFromSelection<
  typeof FUNCTIONS_TAB_SECTION_FRAGMENT
>;

export function FunctionsTabSection(
  props: {data: FunctionsTabSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  function generateMediaObject(item: {image?: any; video?: any}): {
    src: string;
    type: 'image' | 'video';
  } {
    if (item.video.video.asset) {
      const video = getFileAsset(item.video.video.asset.asset._ref, {
        dataset: env.SANITY_STUDIO_DATASET,
        projectId: env.SANITY_STUDIO_PROJECT_ID,
      });

      return {
        src: video.url,
        type: 'video',
      };
    } else if (item.image) {
      return {
        src: getImageUrl((item.image as any).image.asset.asset._ref, env),
        type: 'image',
      };
    }

    throw new Error('Media object must have either an image or a video.');
  }

  const itemsWithMedia = data.items.map((item, index) => {
    const mediaObject = generateMediaObject(item.media || {});

    return {
      ...item,
      description: 'TESTING THIS THNING',
      icon: <IconRenderer data={{name: item.icon}} />,
      id: index + 1,
      media: mediaObject,
      scrollMax: 3,
      scrollMin: 0,
      text: item.text as string,
    };
  });

  return (
    <Section colorTheme={theme}>
      <Container>
        <LazyMotion features={domAnimation}>
          <FunctionsTab
            darkMode={darkMode}
            items={itemsWithMedia}
            lastLineText={data.lastLineText as string}
          />
        </LazyMotion>
      </Container>
    </Section>
  );
}
