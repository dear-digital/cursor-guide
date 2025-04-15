import type {TypeFromSelection} from 'groqd';

import {
  CaretLeft,
  CaretRight,
  Headline,
  MediaContainer,
} from '@vorwerk/fibre-react';
import {useEffect, useState} from 'react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {v4 as uuidv4} from 'uuid';

import type {SectionDefaultProps} from '~/lib/type';
import type {MEDIA_CONTAINER_CAROUSEL_SECTION_FRAGMENT} from '~/qroq/content-blocks/mediaContainerCarouselFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';

import Container from '../Container';
import {Section} from '../layout/Section';
import {MediaContainerContent} from '../ui/MediaContainerContent';

export type MediaContainerCarouselSectionProps = TypeFromSelection<
  typeof MEDIA_CONTAINER_CAROUSEL_SECTION_FRAGMENT
>;

export function MediaContainerCarouselSection(
  props: {data: MediaContainerCarouselSectionProps} & SectionDefaultProps,
) {
  const [uniqueId, setUniqueId] = useState<null | string>(null);
  useEffect(() => {
    setUniqueId(uuidv4()); // Generate ID only on the client
  }, []);
  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);
  const darkMode = theme === 'dark';

  return (
    <Section className={`text-theme-${theme}`} colorTheme={theme}>
      <Container className={darkMode ? 'dark-mode' : 'light-mode'}>
        <MediaContainer aspectRatio="21/9">
          <div className="text-center">
            <div className="mb-8">
              {data.headline && (
                <Headline
                  children={
                    <TitleRenderer data={{title: data.headline.headline}} />
                  }
                  eyebrowLine={data.headline.eyebrowline as string}
                  spaceBelow={data.headline.spaceBelow}
                  strongColor={data.headline.strongColor}
                  subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.headline.subline}} />}
                />
              )}
            </div>
            <Swiper
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Navigation, Pagination]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              pagination={{clickable: true}}
            >
              {data.content.map((content, index) => (
                <SwiperSlide key={index}>
                  <MediaContainerContent data={content} theme={theme} />
                </SwiperSlide>
              ))}
              <div className="pt-3">
                <div className="absolute bottom-0 right-24 z-10 ml-2 -translate-y-1/2">
                  <button
                    className={`${prevClass} flex h-16 w-16 items-center justify-center rounded-full bg-gray-100`}
                  >
                    <CaretLeft className="size-10" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 z-10 mr-2 -translate-y-1/2">
                  <button
                    className={`${nextClass} flex h-16 w-16 items-center justify-center rounded-full bg-gray-100`}
                  >
                    <CaretRight className="size-10" />
                  </button>
                </div>
              </div>
            </Swiper>
          </div>
        </MediaContainer>
      </Container>
    </Section>
  );
}
