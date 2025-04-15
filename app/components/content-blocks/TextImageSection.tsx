import type {TypeFromSelection} from 'groqd';

import type {SectionDefaultProps} from '~/lib/type';
import type {TEXT_IMAGE_SECTION_FRAGMENT} from '~/qroq/content-blocks/textImageSectionFragment';

import {TEXT_IMAGE_DIRECTIONS} from '~/lib/constants/text-image-directions';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';

import {Container} from '../Container';

export type TextImageSectionProps = TypeFromSelection<
  typeof TEXT_IMAGE_SECTION_FRAGMENT
>;

export function TextImageSection(
  props: {data: TextImageSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  const textCss =
    props.data.direction === TEXT_IMAGE_DIRECTIONS[0]
      ? 'lg:order-first'
      : 'lg:col-end-13';
  const imageCss =
    props.data.direction === TEXT_IMAGE_DIRECTIONS[0]
      ? 'lg:col-start-7'
      : 'lg:order-first';

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className={`${imageCss} col-span-6 pb-4 lg:pb-0`}>
          <div className="h-full w-full">
            <ImageRenderer
              className="rounded-base"
              data={{image: data.image}}
            />
          </div>
        </div>
        <div className={`${textCss} col-span-5`}>
          <div className="flex h-full w-full flex-col justify-center space-y-4 lg:space-y-6">
            {data.title && data.title.title && (
              <TitleRenderer data={{title: data.title}} />
            )}
            {data.subtitle && <TitleRenderer data={{title: data.subtitle}} />}
            <TextRenderer data={{text: data.text}} />
            {!!data?.link?.label && (
              <div className="mt-6">
                <ButtonRenderer data={{link: data.link}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
