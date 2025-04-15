import type {TypeFromSelection} from 'groqd';

import {
  ParallaxProductSection as ParallaxProduct,
  SectionContainer,
} from '@vorwerk/fibre-react';
import {domAnimation, LazyMotion} from 'framer-motion';

import type {SectionDefaultProps} from '~/lib/type';
import type {PARALLAX_PRODUCT_SECTION_FRAGMENT} from '~/qroq/content-blocks/parallaxProductSectionFragment';

import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {useRootLoaderData} from '~/root';

export type ParallaxProductSectionProps = TypeFromSelection<
  typeof PARALLAX_PRODUCT_SECTION_FRAGMENT
>;

export function ParallaxProductSection(
  props: {data: ParallaxProductSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;

  const productImage = getImageUrl(
    (data.productImage as any).image.asset.asset._ref,
    env,
  );
  const logoImage = getImageUrl(
    (data.logoImage as any).image.asset.asset._ref,
    env,
  );

  return (
    <LazyMotion features={domAnimation}>
      <ParallaxProduct
        darkMode={data.darkMode}
        logoImage={logoImage}
        productImage={productImage}
        productImageAlt={data.productImage.name}
      />
    </LazyMotion>
  );
}
