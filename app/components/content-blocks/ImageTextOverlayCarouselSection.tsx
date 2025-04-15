import {TypeFromSelection} from 'groqd';
import {Parallax} from 'react-scroll-parallax';
import {Swiper, SwiperSlide} from 'swiper/react';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ContentAlignmentRenderer from '~/lib/renderers/contentAlignmentRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextAlignmentRenderer from '~/lib/renderers/textAlignmentRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {SectionDefaultProps} from '~/lib/type';
import {IMAGE_TEXT_OVERLAY_CAROUSEL_SECTION_FRAGMENT} from '~/qroq/content-blocks/imageTextOverlayCarouselSectionFragment';
import Container from '../Container';
import ButtonLeft from '../ui/swiper/ButtonLeft';
import ButtonRight from '../ui/swiper/ButtonRight';
import {Navigation} from 'swiper/modules';

export type ImageTextOverlayCarouselSectionProps = TypeFromSelection<
  typeof IMAGE_TEXT_OVERLAY_CAROUSEL_SECTION_FRAGMENT
>;

export function ImageTextOverlayCarouselSection(
  props: {data: ImageTextOverlayCarouselSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  // Helper function to sanitize the input values
  const sanitizeInput = (value: string | undefined) => {
    return value?.replace(/[^\w-]/g, ''); // Remove unexpected characters
  };

  return (
    <Swiper
      slidesPerView={1}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{clickable: true}}
    >
      {data.items.map((item) => (
        <SwiperSlide key={item._key}>
          <div className="relative">
            <ImageRenderer
              className="brightness-60"
              data={{image: item.image}}
            />
            <div className="absolute left-0 top-0 h-full w-full">
              <div
                className={`brand-shape-${sanitizeInput(item.bowPosition)}`}
              ></div>
              <ContentAlignmentRenderer alignment={item.contentAlignment} className="container">
                <div className="lg:max-w-4xl">
                  <div className="p-6 lg:p-10">
                    <Parallax speed={-5}>
                      <TextAlignmentRenderer textAlignment={item.textAlignment}>
                        <div className="flex flex-col gap-2 text-white">
                          <div className="text-lg font-light leading-normal">
                            {item.subTitle && (
                              <TitleRenderer data={{title: item.subTitle}} />
                            )}
                          </div>
                          <TitleRenderer data={{title: item.title}} />
                          <TextRenderer data={{text: item.richtext}} />
                          <div>
                            {!!item.linkBlock?.label && (
                              <div className="mt-6">
                                <ButtonRenderer data={{link: item.linkBlock}} />
                              </div>
                            )}
                          </div>
                        </div>
                      </TextAlignmentRenderer>
                    </Parallax>
                  </div>
                </div>
              </ContentAlignmentRenderer>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="hidden lg:block">
        <ButtonLeft className="absolute left-10 top-1/2 z-10 ml-2 -translate-y-1/2" />
        <ButtonRight className="absolute right-10 top-1/2 z-10 mr-2 -translate-y-1/2" />
      </div>

      <Container className="mb-6">
        <div className="mt-6 flex justify-between lg:hidden">
          <ButtonLeft color="dark" size="small" />
          <ButtonRight color="dark" size="small" />
        </div>
      </Container>
    </Swiper>
  );
}
