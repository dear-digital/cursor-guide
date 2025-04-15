import type {TypeFromSelection} from 'groqd';

import { Headline } from '@vorwerk/fibre-react';
import { useState } from 'react';

import type {SectionDefaultProps} from '~/lib/type';
import type {DROPDOWN_SECTION_FRAGMENT} from '~/qroq/content-blocks/dropdownSectionFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';

import {Section} from '../layout/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion';

export type DropdownSectionProps = TypeFromSelection<
  typeof DROPDOWN_SECTION_FRAGMENT
>;

export function DropdownSection(
  props: {data: DropdownSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);
  const [showAll, setShowAll] = useState(false);

  const faqItems = data.faqs || [];
  const hasMoreItems = faqItems.length > 4;
  const showMoreEnabled = data.showMoreOption !== false; // Default to true if undefined
  const displayedFaqs = showMoreEnabled && hasMoreItems && !showAll ? faqItems.slice(0, 4) : faqItems;
  
  // Default values if translations are not provided
  const showMoreDefault = "Show more";
  const showLessDefault = "Show less";
  
  // Ensure string values for the button text
  const showMoreText = (data.showMoreText as string) || showMoreDefault;
  const showLessText = (data.showLessText as string) || showLessDefault;

  return (
    <Section className={`text-theme-${theme} container`} colorTheme={theme}>
      {data.headline?.headline.title && (
        <div className="py-8 text-center">
          <Headline
            children={<TitleRenderer data={{title: data.headline.headline}} />}
            eyebrowLine={data.headline.eyebrowline as string}
            spaceBelow={data.headline.spaceBelow}
            strongColor={data.headline.strongColor}
            subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.headline.subline}} />}
          />
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <h3 className="px-6 pb-4 pt-6 text-3xl font-medium">
          {data.title as string}
        </h3>
        {displayedFaqs && displayedFaqs.length > 0 && (
          <>
            <Accordion
              className="divide-y divide-gray-200"
              collapsible
              type="single"
            >
              {displayedFaqs.map((faq, index) => (
                <AccordionItem
                  className="border-none"
                  id={faq.id || undefined}
                  key={faq._key || index}
                  value={faq._key || `faq-${index}`}
                >
                  <AccordionTrigger className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 [&>svg]:text-[#009A3D]">
                    <span className="pr-8 text-base">
                      {faq.question as string}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="text-base text-gray-600">
                      <TextRenderer data={{text: faq.answer}} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {hasMoreItems && showMoreEnabled && (
              <div className="flex justify-end px-6 py-4">
                <button 
                  className="text-[#009A3D] font-medium hover:underline focus:outline-none"
                  onClick={() => setShowAll(!showAll)} 
                >
                  {showAll ? showLessText : showMoreText}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
}
