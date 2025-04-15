import type {TypeFromSelection} from 'groqd';

import {Headline, ImageCarousel} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {IMAGE_CAROUSEL_SECTION_FRAGMENT} from '~/qroq/content-blocks/imageCarouselFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import Container from '../Container';
import {Section} from '../layout/Section';

type ImageCarouselSectionProps = TypeFromSelection<
  typeof IMAGE_CAROUSEL_SECTION_FRAGMENT
>;

export function ImageCarouselSection(
  props: {data: ImageCarouselSectionProps} & SectionDefaultProps,
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

  const {firstLine, secondLine, thirdLine, ...rest} = data.eyecatcher;

  const eyecatcher = {
    ...rest,
    firstLine: firstLine as string,
    secondLine: secondLine as string,
    thirdLine: thirdLine as string,
  };

  return (
    <Section className={`text-theme-${theme} text-center`} colorTheme={theme}>
      {data.headline?.headline && (
        <div className="text-center py-12">
          <Headline
            children={<TitleRenderer data={{title: data.headline.headline}} />}
            eyebrowLine={data.headline.eyebrowline as string}
            spaceBelow={data.headline.spaceBelow}
            strongColor={data.headline.strongColor}
            subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.headline.subline}} />}
          />
        </div>
      )}
      {data.productImage && (
        <ImageCarousel
          darkMode={darkMode}
          eyecatcher={eyecatcher}
          images={images}
          productImage={getImageUrl(data.productImage.sm.image._ref, env, 1080)}
          productImageAlt={'test'}
          showEyecatcher={data.showEyeCatcher}
        />
      )}
      <Container>
        {data.text && (
          <div className="mx-auto mt-16 lg:w-1/2">
            <TextRenderer data={{text: data.text}} />
          </div>
        )}
      </Container>
    </Section>
  );
}
