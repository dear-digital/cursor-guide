import type { TypeFromSelection } from 'groqd';

import { Parallax } from 'react-scroll-parallax';

import type { SectionDefaultProps } from '~/lib/type';
import type { IMAGE_TEXT_OVERLAY_HERO_FRAGMENT } from '~/qroq/hero-blocks/imageTextOverlayHeroFragment';

import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ContentAlignmentRenderer from '~/lib/renderers/contentAlignmentRenderer';
import HeroTitleRenderer from '~/lib/renderers/heroTitleRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextAlignmentRenderer from '~/lib/renderers/textAlignmentRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';

export type ImageTextOverlayHeroProps = TypeFromSelection<
  typeof IMAGE_TEXT_OVERLAY_HERO_FRAGMENT
>;

export function ImageTextOverlayHero(
  props: {data: ImageTextOverlayHeroProps} & SectionDefaultProps,
) {
  const {data} = props;

  return (
    <div className="relative">
        <ImageRenderer className="brightness-60 aspect-11/18 lg:aspect-auto object-cover" data={{image: data.image}} />
      <div className="absolute left-0 top-0 h-full w-full">
        <ContentAlignmentRenderer alignment={data.contentAlignment} className='container'>
          <div className="lg:max-w-4xl">
            <div className="p-6 lg:p-10">
              <TextAlignmentRenderer textAlignment={data.textAlignment}>
                <div className="flex w-full flex-col gap-2">
                  <Parallax speed={-5}>
                    <HeroTitleRenderer data={{title: data.title}} />
                    <TextRenderer data={{text: data.text}} />
                    <div>
                      {!!data.link?.label && (
                        <div className='mt-6'>
                          <ButtonRenderer data={{link: data.link}} />
                        </div>
                      )}
                    </div>
                  </Parallax>
                </div>
              </TextAlignmentRenderer>
            </div>
          </div>
        </ContentAlignmentRenderer>
      </div>
    </div>
  );
}
