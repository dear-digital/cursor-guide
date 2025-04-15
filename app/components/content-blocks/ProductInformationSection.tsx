import type {TypeFromSelection} from 'groqd';
import type {ProductVariantFragmentFragment} from 'storefrontapi.generated';

import {Await, useLoaderData} from '@remix-run/react';
import {stegaClean} from '@sanity/client/stega';
import {flattenConnection} from '@shopify/hydrogen-react';
import {createContext, Suspense, useContext} from 'react';

import type {SectionDefaultProps} from '~/lib/type';
import type {PRODUCT_INFORMATION_SECTION_FRAGMENT} from '~/qroq/content-blocks/productInformationSectionFragment';
import type {loader} from '~/routes/($locale).products.$productHandle';

import {cn, getAspectRatioData} from '~/lib/utils';

import {ShopifyDescriptionBlock} from '../blocks/ShopifyDescriptionBlock';
import {Section} from '../layout/Section';
import {MediaGallery} from '../product/MediaGallery';
import {ProductDetails} from '../product/ProductDetails';
import {ProductSpecifications} from '../product/ProductSpecifications';
import {Skeleton} from '../Skeleton';

export type ProductInformationSectionProps = TypeFromSelection<
  typeof PRODUCT_INFORMATION_SECTION_FRAGMENT
>;

type ProductVariantsContextType = {
  variants: ProductVariantFragmentFragment[];
};

export function ProductInformationSection(
  props: {
    data: ProductInformationSectionProps;
  } & SectionDefaultProps,
) {
  const loaderData = useLoaderData<typeof loader>();
  const {data} = props;
  const variantsPromise = loaderData.variants;
  const aspectRatio = getAspectRatioData(data.mediaAspectRatio);

  if (variantsPromise) {
    return (
      <>
        <Suspense
          fallback={
            <Skeleton>
              <ProductInformationGrid
                data={stegaClean(data)}
                mediaGallery={<MediaGallery aspectRatio={aspectRatio} />}
                productDetails={<ProductDetails data={data} />}
              />
            </Skeleton>
          }
        >
          <Await
            errorElement={
              <Skeleton isError>
                <ProductInformationGrid
                  data={stegaClean(data)}
                  mediaGallery={<MediaGallery aspectRatio={aspectRatio} />}
                  productDetails={<ProductDetails data={data} />}
                />
              </Skeleton>
            }
            resolve={variantsPromise}
          >
            {({product}) => {
              const variants = product?.variants?.nodes.length
                ? flattenConnection(product.variants)
                : [];

              return (
                <ProductVariantsContext.Provider value={{variants}}>
                  <ProductInformationGrid
                    data={stegaClean(data)}
                    mediaGallery={<MediaGallery aspectRatio={aspectRatio} />}
                    productDetails={<ProductDetails data={data} />}
                  />
                </ProductVariantsContext.Provider>
              );
            }}
          </Await>
        </Suspense>
      </>
    );
  }

  return (
    <ProductInformationGrid
      data={stegaClean(data)}
      mediaGallery={<MediaGallery aspectRatio={aspectRatio} />}
      productDetails={<ProductDetails data={data} />}
    />
  );
}

function ProductInformationGrid({
  data,
  mediaGallery,
  productDetails,
}: {
  data: ProductInformationSectionProps;
  mediaGallery: React.ReactNode;
  productDetails: React.ReactNode;
}) {
  return (
    <Section
      className={
        'product-media-gallery grid gap-8 overflow-hidden lg:container lg:grid-cols-12'
      }
    >
      <div className={cn('flex flex-col overflow-hidden lg:col-span-8')}>
        {mediaGallery}
        <div className="hidden lg:block">
          <div
            className="shopify-description container py-16 text-xl font-normal leading-12 lg:px-0 lg:py-32 lg:text-3xl"
            id="technical-details"
          >
            <ShopifyDescriptionBlock _key={''} _type={'shopifyDescription'} />
          </div>
          <div className="container lg:px-0">
            <ProductSpecifications />
          </div>
        </div>
      </div>

      <div className={cn('container lg:col-span-4 lg:block lg:p-0')}>
        {productDetails}

        <div className="lg:hidden">
          <div className="shopify-description py-16 text-xl font-normal leading-12">
            <ShopifyDescriptionBlock _key={''} _type={'shopifyDescription'} />
          </div>

          <ProductSpecifications />
        </div>
      </div>
    </Section>
  );
}

export const ProductVariantsContext =
  createContext<null | ProductVariantsContextType>(null);

export function useProductVariants() {
  return useContext(ProductVariantsContext);
}
