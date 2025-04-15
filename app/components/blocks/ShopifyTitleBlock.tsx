import type {TypeFromSelection} from 'groqd';

import {useParams} from '@remix-run/react';
import {useProduct} from '@shopify/hydrogen-react';

import type {SHOPIFY_TITLE_BLOCK_FRAGMENT} from '~/qroq/blocks';

export type ShopifyTitleBlockProps = TypeFromSelection<
  typeof SHOPIFY_TITLE_BLOCK_FRAGMENT
>;

export function ShopifyTitleBlock(props: ShopifyTitleBlockProps) {
  const {product} = useProduct();
  const params = useParams();
  const titleCss = 'text-contentPrimary text-xxl lg:text-3xl font-bold mb-6';

  if (!product) return null;

  return params.productHandle ? (
    <h1 className={`${titleCss}`}>{product?.title}</h1>
  ) : (
    <h2 className={`${titleCss}`}>{product?.title}</h2>
  );
}
