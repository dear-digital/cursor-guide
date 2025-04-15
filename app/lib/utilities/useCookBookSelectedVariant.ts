import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {PartialDeep} from 'type-fest';

import {useLocation} from '@remix-run/react';
import {useMemo} from 'react';

import {useRootLoaderData} from '~/root';

export function useCookBookSelectedVariant(props: {
  variants?: Array<PartialDeep<ProductVariant>>;
}) {
  const {search} = useLocation();
  const {locale} = useRootLoaderData();
  const cookBookLocale = locale?.preferredLocale ?? 'nl';
  const searchParams = new URLSearchParams(search);
  const variantIdParam = searchParams.get('variant');

  const firstAvailableVariant = useMemo(
    () => props.variants?.find((variant) => variant?.availableForSale),
    [props.variants],
  );

  const firstVariantFound = useMemo(() => {
    return props.variants?.[0];
  }, [props.variants]);

  const selectedVariant = useMemo(() => {
    if (variantIdParam) {
      return props.variants?.find((variant) => {
        return variant.id?.includes(variantIdParam);
      });
    }

    const cookbookVariant = props.variants?.find((variant) => {
      return variant?.selectedOptions?.some(
        (option) =>
          option.name.toLowerCase() === 'cookbook' &&
          option.value.toLowerCase() === cookBookLocale.toLowerCase(),
      );
    });

    if (cookbookVariant) {
      return cookbookVariant;
    }

    return null;
  }, [cookBookLocale, props.variants, variantIdParam]);

  if (!selectedVariant) {
    return firstAvailableVariant ?? firstVariantFound;
  }

  return selectedVariant;
}
