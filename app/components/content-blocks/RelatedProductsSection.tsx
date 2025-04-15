import type {TypeFromSelection} from 'groqd';

import {Await, useLoaderData} from '@remix-run/react';
import isEmpty from 'lodash.isempty';
import {Suspense} from 'react';

import type {SectionDefaultProps} from '~/lib/type';
import type {RELATED_PRODUCTS_SECTION_FRAGMENT} from '~/qroq/content-blocks/relatedProductsSectionFragment';
import type {loader} from '~/routes/($locale).products.$productHandle';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';

import {ProductCardGrid} from '../product/ProductCardGrid';
import {RelatedProducts} from '../product/RelatedProducts';
import {Skeleton} from '../Skeleton';

export type RelatedProductsSectionProps = TypeFromSelection<
  typeof RELATED_PRODUCTS_SECTION_FRAGMENT
>;

export function RelatedProductsSection(
  props: {data: RelatedProductsSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const loaderData = useLoaderData<typeof loader>();
  const {themeContent} = useSanityThemeContent();
  const relatedProductsPromise = loaderData?.relatedProductsPromise;

  if (!relatedProductsPromise) return null;

  return (
    <div className="container">
      <Suspense
        fallback={
          <Skeleton>
            <div className="mt-4">
              <ProductCardGrid
                columns={{desktop: 3}}
                skeleton={{cardsNumber: data.maxProducts || 3}}
              />
            </div>
          </Skeleton>
        }
      >
        <Await
          errorElement={
            <Skeleton isError>
              <div className="mt-4">
                <ProductCardGrid
                  columns={{desktop: 3}}
                  skeleton={{cardsNumber: data.maxProducts || 3}}
                />
              </div>
            </Skeleton>
          }
          resolve={relatedProductsPromise}
        >
          {(result) => {
            if (isEmpty(result?.recommended)) return null;
            return (
              <div className="my-8 lg:my-16">
                <div className="grid items-end gap-6 lg:grid-cols-12">
                  <div className="scroll-trigger animate--slide-in space-y-4 text-center lg:col-span-12">
                    <div className="text-editor">
                      <h2 className="text-xl font-bold leading-6 lg:text-5xl lg:leading-9">
                        <strong>
                          {themeContent?.product?.relatedProductsTitle}
                        </strong>
                      </h2>
                    </div>
                    {data.description && (
                      <p className="text-lg font-light">{data.description}</p>
                    )}
                  </div>
                </div>
                <RelatedProducts
                  data={result}
                  maxProducts={data.maxProducts || 3}
                />
                <div className="scroll-trigger animate--slide-in mt-8 text-center lg:mt-16">
                  {data.link && typeof data.link.label === 'string' && (
                    <div className="scroll-trigger animate--slide-in flex items-center justify-center">
                      <ButtonRenderer
                        data={{
                          link: {
                            ...data.link,
                            label:
                              themeContent?.product
                                ?.relatedProductsButtonText ?? 'More',
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
