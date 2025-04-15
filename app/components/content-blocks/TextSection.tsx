import type {TypeFromSelection} from 'groqd';

import type {SectionDefaultProps} from '~/lib/type';
import type {TEXT_SECTION_FRAGMENT} from '~/qroq/content-blocks/textSectionFragment';

import ButtonGroupRenderer from '~/lib/renderers/buttonGroupRenderer';
import TextAlignmentRenderer from '~/lib/renderers/textAlignmentRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';

import {Container} from '../Container';
import {Section} from '../layout/Section';

export type TextSectionProps = TypeFromSelection<typeof TEXT_SECTION_FRAGMENT>;

export function TextSection(
  props: {data: TextSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  return (
    <Section className={`text-theme-${theme} text-section`} colorTheme={theme}>
      <Container className="py-12">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <TextAlignmentRenderer textAlignment={data.textAlignment}>
              {data.title && data.title.title && (
                <div className="pb-4">
                  <TitleRenderer data={{title: data.title}} />
                </div>
              )}
              <TextRenderer className='text-section-content' data={{text: data.text}} />
              <ButtonGroupRenderer
                buttonGroup={{buttonGroup: data.linksBlock}}
              />
            </TextAlignmentRenderer>
          </div>
        </div>
      </Container>
    </Section>
  );
}
