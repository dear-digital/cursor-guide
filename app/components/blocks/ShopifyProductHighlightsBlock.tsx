import { useProduct } from '@shopify/hydrogen-react';
import { Checkmark } from '@vorwerk/fibre-react';


export function ShopifyProductHighlightsBlock() {
  const {product} = useProduct();
  if (!product || !product.metafields) return null;

  const productHighlights = product.metafields.find(
    (metafield) => metafield?.key === 'product_highlights',
  );

  if (!productHighlights || !productHighlights.value) return null;

  // Convert Shopify rich text to HTML and then split it into an array
  const highlightsHtml = JSON.parse(productHighlights.value) as string[];

  return (
    <div className="my-8">
      <div className="flex flex-col gap-2 text-base">
        {highlightsHtml.map((highlight, index) => (
          <div className="flex items-start gap-4" key={index}>
            <Checkmark
              className="text-primary-default pt-1"
              height={'30px'}
              stroke="#00AC46"
              width={'30px'}
            />
            <div className="w-full"> {highlight}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
