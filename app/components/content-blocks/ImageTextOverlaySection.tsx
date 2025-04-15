import {TypeFromSelection} from 'groqd';
import ContentAlignmentRenderer from '~/lib/renderers/contentAlignmentRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextAlignmentRenderer from '~/lib/renderers/textAlignmentRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {SectionDefaultProps} from '~/lib/type';
import {IMAGE_TEXT_OVERLAY_SECTION_FRAGMENT} from '~/qroq/content-blocks/imageTextOverlaySectionFragment';

export type ImageTextOverlaySectionProps = TypeFromSelection<
  typeof IMAGE_TEXT_OVERLAY_SECTION_FRAGMENT
>;

export function ImageTextOverlaySection(
  props: {data: ImageTextOverlaySectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  // Helper function to sanitize the input values
  const sanitizeInput = (value: string | undefined) => {
    return value?.replace(/[^\w-]/g, ''); // Remove unexpected characters
  };

  return (
    <div className="relative">
      <ImageRenderer data={{image: data.image}} />
      <div className="absolute left-0 top-0 h-full w-full">
        <div className={`brand-shape-${sanitizeInput(data.bowPosition)}`}></div>
        <ContentAlignmentRenderer alignment={data.contentAlignment} className='container'>
          <div className="lg:max-w-4xl">
            <div className="p-6 lg:p-10">
              <TextAlignmentRenderer textAlignment={data.textAlignment}>
                <div className="flex flex-col gap-2 text-white">
                  <div className="text-lg font-light leading-normal">
                    {data.subTitle && (
                      <TitleRenderer data={{title: data.subTitle}} />
                    )}
                  </div>
                  <TitleRenderer data={{title: data.title}} />
                  <TextRenderer data={{text: data.richtext}} />
                </div>
              </TextAlignmentRenderer>
            </div>
          </div>
        </ContentAlignmentRenderer>
      </div>
    </div>
  );
}
