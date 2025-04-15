import type {TypeFromSelection} from 'groqd';

import {useFetcher} from '@remix-run/react';

import type {SectionDefaultProps} from '~/lib/type';
import type {ORDER_FORM_SECTION_FRAGMENT} from '~/qroq/content-blocks/orderFormSectionFragment';

import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';

import {Container} from '../Container';
import {Section} from '../layout/Section';
import {OrderForm} from '../ui/OrderForm';

// @todo test this section once sanity plan is upgraded

export type OrderFormSectionProps = TypeFromSelection<
  typeof ORDER_FORM_SECTION_FRAGMENT
>;

export function OrderFormSection(
  props: {data: OrderFormSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const {Form, ...fetcher} = useFetcher();
  const formData = fetcher?.data as {error?: {message: string}; form?: any};
  const formSubmitted = formData?.form;
  const formError = formData?.error;
  const theme = sanitizeInput(data.colorTheme);

  return (
    <Section
      className={`text-theme-${theme} min-h-screen !pt-0`}
      colorTheme={theme}
    >
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-12 space-y-4 lg:col-span-8 lg:col-start-3 lg:space-y-6">
            {data.title && <TitleRenderer data={data} />}
            {formSubmitted ? (
              <div className="text-green-600 text-lg">
                <div>
                  {data.formSubmittedMessage ? (
                    <TextRenderer data={{text: data.formSubmittedMessage}} />
                  ) : (
                    'Thank you for your message. We will get back to you shortly.'
                  )}
                </div>
                <div className="pt-4">
                  {data.image && (
                    <ImageRenderer
                      className="w-full"
                      data={{image: data.image}}
                    />
                  )}
                </div>
                {data.linkBlock && (
                  <div className="mt-4 w-max mx-auto">
                    <ButtonRenderer data={{link: data?.linkBlock}} />
                  </div>
                )}
              </div>
            ) : (
              <OrderForm Form={Form} {...data} />
            )}

            {formError && (
              <div className="text-lg text-red-500">
                <div>
                  {data.formErrorMessage ? (
                    <TextRenderer data={{text: data.formErrorMessage}} />
                  ) : (
                    'An error occurred while submitting the form.'
                  )}
                </div>
                <p>{formError.message}</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
