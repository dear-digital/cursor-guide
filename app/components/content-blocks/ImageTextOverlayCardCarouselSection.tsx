import type {TypeFromSelection} from 'groqd';

import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {SectionDefaultProps} from '~/lib/type';
import type {IMAGE_TEXT_OVERLAY_CARD_CAROUSEL_FRAGMENT} from '~/qroq/content-blocks/imageTextOverlayCardCarouselSectionFragment';

import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';

import Container from '../Container';
import ButtonLeft from '../ui/swiper/ButtonLeft';
import ButtonRight from '../ui/swiper/ButtonRight';

export type ImageTextOverlayCardCarouselProps = TypeFromSelection<
  typeof IMAGE_TEXT_OVERLAY_CARD_CAROUSEL_FRAGMENT
>;

export function ImageTextOverlayCardCarousel(
  props: {data: ImageTextOverlayCardCarouselProps} & SectionDefaultProps,
) {
  const {data} = props;

  return (
    <div className="text-dark overflow-hidden">
      <Container>
        {data.title && data.title.title && (
          <div className="pb-4">
            <TitleRenderer data={{title: data.title}} />
          </div>
        )}
        <div className="flex w-full flex-col justify-between gap-3 pb-6 lg:flex-row lg:items-end lg:pb-10">
          <div className="max-w-3xl">
            <TextRenderer data={{text: data.text}} />
          </div>
          {data.link && typeof data.link.label === 'string' && (
            <ButtonRenderer className="w-fit" data={{link: data.link}} />
          )}
        </div>
      </Container>
      {data.cards && data.cards.length > 0 && (
        <Container>  
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1.1,
              },
              768: {
                slidesPerView: 2.1,
              },
              1024: {
                slidesPerView: 3.3,
              },
            }}
            className="relative !overflow-visible"
            loop={false}
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            slidesPerView={1.15}
            spaceBetween={16}
            watchOverflow={true}
          >
            {data.cards?.map((card, index) => (
              <SwiperSlide className='group' key={index}>
                <div className="relative overflow-hidden [&>span]:h-full">
                  <ImageRenderer
                    className="size-full h-full w-full rounded-base object-cover brightness-50 transition duration-300 lg:brightness-75 lg:hover:brightness-50"
                    data={{image: card.image}}
                  />
                  <div className="absolute left-10 top-20 z-10 w-full text-white">
                    <TextRenderer
                      className="leading-9"
                      data={{text: card.text}}
                    />
                    <div className="brand-shape -left-20 top-5 z-10"></div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 z-10 flex flex-col gap-6">
                    <TextRenderer
                      className="translate-y-4 leading-4 text-white transition-all duration-300 ease-in-out lg:transform-gpu lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                      data={{text: card.overlayText}}
                    />
                    {card.link && typeof card.link.label === 'string' && (
                      <ButtonRenderer
                        className="mt-6"
                        data={{link: card.link}}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* <div className="hidden lg:block">
              <ButtonLeft className="absolute left-14 top-1/2 z-10 ml-2 -translate-y-1/2" />
              <ButtonRight className="absolute right-10 top-1/2 z-10 mr-2 -translate-y-1/2" />
            </div> */}
            <Container>
              <div className="mt-6 flex justify-between lg:hidden">
                <ButtonLeft color="dark" size="small" />
                <ButtonRight color="dark" size="small" />
              </div>
            </Container>
          </Swiper>
        </Container>
      )}
      {data.buttonLinkBlock &&
        typeof data.buttonLinkBlock.label === 'string' && (
          <div className="w-full pt-6 text-center lg:pt-10">
            <ButtonRenderer data={{link: data.buttonLinkBlock}} />
          </div>
        )}
    </div>
  );
}
