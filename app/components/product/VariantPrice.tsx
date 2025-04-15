import type {ProductVariantFragmentFragment} from 'storefrontapi.generated';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import {useSelectedVariant} from '~/hooks/useSelectedVariant';

import {ShopifyMoney} from '../ShopifyMoney';

export function VariantPrice({
  variants,
}: {
  variants: ProductVariantFragmentFragment[];
}) {
  const {themeContent} = useSanityThemeContent();
  const selectedVariant = useSelectedVariant({variants});
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {compareAtPrice && (
          <ShopifyMoney
            className="font-bold leading-normal text-muted-foreground line-through lg:text-xl"
            data={compareAtPrice}
          />
        )}
        {price && (
          <ShopifyMoney
            className="font-bold leading-normal text-contentPrimary lg:text-xl"
            data={price}
          />
        )}
      </div>
      {themeContent?.product.vatAndShippingText && (
        <div className="text-sm font-normal leading-tight text-[#707375]">
          {themeContent?.product.vatAndShippingText}
        </div>
      )}
    </div>
  );
}

export function VariantPriceSkeleton() {
  return (
    <div aria-hidden className="text-lg">
      <span className="opacity-0">Skeleton</span>
    </div>
  );
}
