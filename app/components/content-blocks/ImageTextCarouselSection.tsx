import type {TypeFromSelection} from 'groqd';

import type {SectionDefaultProps} from '~/lib/type';
import type {IMAGE_TEXT_CAROUSEL_SECTION_FRAGMENT} from '~/qroq/content-blocks/imageTextCarouselSection';

import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import {Section} from '../layout/Section';

type ImageTextCarouselSectionProps = TypeFromSelection<
  typeof IMAGE_TEXT_CAROUSEL_SECTION_FRAGMENT
>;

export function ImageTextCarouselSection(
  props: {data: ImageTextCarouselSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  const images = data.images.map((image) => {
    return {
      alt: image.name ? image.name : '',
      url: image ? getImageUrl((image as any).image.asset.asset._ref, env) : '',
    };
  });

  return (
    <Section colorTheme={theme}>
      Image text carousel section
    </Section>
  );
}
