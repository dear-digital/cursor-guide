import {useLoaderData} from '@remix-run/react';

import type {loader} from '~/routes/($locale).products.$productHandle';

import {ShopifyRichTextToHtml} from '~/lib/utilities/shopifyRichtextToHtml';

import {Section} from '../layout/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion';

export function ProductSpecifications() {
  const {product} = useLoaderData<typeof loader>();
  const productSpecifications = product.metafields.find(
    (metafield) => metafield?.key === 'product_specifications',
  );

  if (!productSpecifications) return null;

  const specificationReferences = productSpecifications.references?.edges || [];

  const specifications = specificationReferences
    .map((reference) => {
      if (reference.node.__typename !== 'Metaobject') return null;

      const fields = reference.node.fields;
      const titleField = fields.find((field) => field.key === 'title');
      const textField = fields.find((field) => field.key === 'text');
      const type = reference.node.type;

      return {
        text: textField
          ? ShopifyRichTextToHtml(textField.value || '')
          : 'No content',
        title: titleField?.value || 'No title',
        type,
      };
    })
    .filter((specification) => specification !== null);

  return (
    <Section>
      <div className="space-y-6">
        <Accordion type="multiple">
          {specifications?.map((specification, index) => (
            <AccordionItem
              className="border-black/20 first:border-t"
              key={index}
              value={`${specification.title || ''}-${index}`}
            >
              <AccordionTrigger>{specification.title}</AccordionTrigger>
              <AccordionContent>
                <div
                  className="text-base lg:text-xl"
                  dangerouslySetInnerHTML={{__html: specification.text || ''}}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
