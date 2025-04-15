import type {TypeFromSelection} from 'groqd';

import {FullwidthImage} from '@vorwerk/fibre-react';
import ReactDOMServer from 'react-dom/server';

import type {SectionDefaultProps} from '~/lib/type';
import type {FULL_WIDTH_IMAGE_SECTION_FRAGMENT} from '~/qroq/content-blocks/fullWidthImageSectionFragment';

import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import { sanitizeInput } from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import { Section } from '../layout/Section';

export type ImageSectionProps = TypeFromSelection<
  typeof FULL_WIDTH_IMAGE_SECTION_FRAGMENT
>;

export function FullWidthImageSection(
  props: { data: ImageSectionProps } & SectionDefaultProps,
) {
  const { env } = useRootLoaderData();
  const { data } = props;

  const mobileImage = data.image?.sm?.image?._ref
    ? getImageUrl(data.image.sm.image._ref, env)
    : '';
  const desktopImage = data.image?.lg?.image?._ref
    ? getImageUrl(data.image.lg.image._ref, env)
    : mobileImage;

  return (
    <Section colorTheme={sanitizeInput(data.colorTheme)}>
      {data.headline && data.image && (
        <FullwidthImage
          btnText={data.btnText as string}
          desktopImage={desktopImage}
          headline={{
            children: ReactDOMServer.renderToStaticMarkup(
              <TitleRenderer data={{ title: data.headline }} />,
            ),
          }}
          mobileImage={mobileImage}
        />
      )}
    </Section>
  );
}