import type {TypeFromSelection} from 'groqd';

import type {SectionDefaultProps} from '~/lib/type';
import type {FAQ_SECTION_FRAGMENT} from '~/qroq/content-blocks/faqSectionFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';

import Container from '../Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion';

type FaqSectionProps = TypeFromSelection<typeof FAQ_SECTION_FRAGMENT>;

export function FaqSection(
  props: {data: FaqSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  return (
    <Container>
      <div className="lg:grid w-full grid-cols-3">
        {data.title && (
          <div className="w-full pb-6 text-left">
            <TitleRenderer data={{title: data.title}} />
          </div>
        )}
        {data.faqs && (
          <div className="col-span-2 w-full">
            <Accordion type="multiple">
              {data.faqs?.map((faq, index) => (
                <AccordionItem
                  className="border-blue last:border-b-0"
                  id={faq.id || undefined}
                  key={index}
                  value={faq.question || ''}
                >
                  <AccordionTrigger className="text-3xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <TextRenderer data={{text: faq.answer}} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </Container>
  );
}
