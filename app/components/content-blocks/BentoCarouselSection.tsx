import type { TypeFromSelection } from 'groqd';

import { CaretLeft, CaretRight, Headline } from '@vorwerk/fibre-react';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import type { SectionDefaultProps } from '~/lib/type';
import type { BENTO_CAROUSEL_SECTION_FRAGMENT } from '~/qroq/content-blocks/bentoCarouselSectionFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import { getImageUrl } from '~/lib/utilities/getImageUrl';
import { sanitizeInput } from '~/lib/utilities/sanitizeInput';
import { useRootLoaderData } from '~/root';

import Container from '../Container';
import { Section } from '../layout/Section';

export type BentoCarouselSectionProps = TypeFromSelection<
  typeof BENTO_CAROUSEL_SECTION_FRAGMENT
>;

export function BentoCarouselSection(
  props: {data: BentoCarouselSectionProps} & SectionDefaultProps,
) {
  const [uniqueId, setUniqueId] = useState<null | string>(null);
  useEffect(() => {
    setUniqueId(uuidv4()); // Generate ID only on the client
  }, []);
  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;
  const {data} = props;
  const {env} = useRootLoaderData();
  const theme = sanitizeInput(data.colorTheme);
  const darkMode = theme === 'dark';

  return (
    <Section className={`text-theme-${theme} text-center`} colorTheme={theme}>
      <Container className={darkMode ? 'dark-mode' : 'light-mode'}>
        {data.headline?.headline && (
          <div className="text-center">
            <Headline
              children={
                <TitleRenderer data={{title: data.headline.headline}} />
              }
              eyebrowLine={data.headline.eyebrowline as string}
              spaceBelow={data.headline.spaceBelow}
              strongColor={data.headline.strongColor}
              subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.headline.subline}} />}
            />
          </div>
        )}
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
          slidesPerView={1}
          spaceBetween={16}
        >
          {data.slides.map((slide, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <div
                className="grid grid-cols-2 gap-10 py-6"
                style={{gridAutoRows: '120px'}}
              >
                {slide.tiles.map((tile, tileIndex) => (
                  <div
                    className={`relative flex flex-col ${
                      darkMode ? 'bg-boldFourth' : 'bg-gray-background'
                    } ${tileIndex % 2 === 0 ? 'row-span-3' : 'row-span-2'}`}
                    key={tileIndex}
                  >
                    <p
                      className={`absolute left-8 text-xl ${
                        tile.textBottom ? 'bottom-6' : 'top-6'
                      } ${darkMode ? 'text-white' : 'text-black'}`}
                    >
                      {tile.title as string}
                    </p>

                    <img
                      alt={tile.title as string}
                      className="h-full w-full object-cover"
                      src={getImageUrl(
                        (tile.image as any)?.image?.asset?.asset?._ref,
                        env,
                      )}
                    />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
          <div className="pt-3">
            <div className="absolute right-24 bottom-0 z-10 ml-2 -translate-y-1/2">
              <button className={`${prevClass} flex justify-center items-center w-16 h-16 rounded-full bg-gray-500`}><CaretLeft className='size-10' /></button>
            </div>
            <div className="absolute right-0 bottom-0 z-10 mr-2 -translate-y-1/2">
              <button className={`${nextClass} flex justify-center items-center w-16 h-16 rounded-full bg-gray-500`}><CaretRight className='size-10' /></button>
            </div>
          </div>
        </Swiper>
      </Container>
    </Section>
  );
}
