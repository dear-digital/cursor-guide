import type {TypeFromSelection} from 'groqd';

import {
  Headline,
  Hero as HeroComponent,
  ParallaxProductSection,
} from '@vorwerk/fibre-react';
import {domAnimation, LazyMotion} from 'framer-motion';
import {Suspense} from 'react';

import type {SectionDefaultProps} from '~/lib/type';
import type {HERO_FRAGMENT} from '~/qroq/hero-blocks/heroFragment';

import ButtonGroupRenderer from '~/lib/renderers/buttonGroupRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import {VideoRenderer} from '../content-blocks/VideoRenderer';
import {Section} from '../layout/Section';

export type ImageTextOverlayHeroProps = TypeFromSelection<typeof HERO_FRAGMENT>;

export function Hero(
  props: {data: ImageTextOverlayHeroProps} & SectionDefaultProps,
) {
  const {env, locale, seo} = useRootLoaderData();
  const {data} = props;
  const slug = seo?.url?.split('/')?.slice(3)?.join('/') || '';

  const darkMode = sanitizeInput(data.colorTheme) === 'dark';

  const isLandingPage = [
    `${locale.pathPrefix}/cosy`,
    `${locale.pathPrefix}/tm7`,
  ].includes(`/${slug}` || '');

  return (
    <>
      <Section colorTheme={sanitizeInput(data.colorTheme)}>
        <Suspense>
          {data.headlineBlock && (
            <HeroComponent
              backgroundColor={data.backgroundColor}
              cta={
                <ButtonGroupRenderer
                  buttonGroup={{buttonGroup: data.linksBlock}}
                />
              }
              headline={
                <div className={`${isLandingPage ? 'pt-32' : ''}`}>
                  <Headline
                    children={
                      <TitleRenderer
                        data={{title: data.headlineBlock.headline}}
                      />
                    }
                    eyebrowLine={
                      data.headlineBlock.eyebrowline as React.ReactNode
                    }
                    spaceBelow={data.headlineBlock.spaceBelow}
                    strongColor={data.headlineBlock.strongColor}
                    subline={
                      <TextRenderer
                        className="subline-text leading-12 lg:text-sm"
                        data={{text: data.headlineBlock.subline}}
                      />
                    }
                  />
                </div>
              }
              image={
                !data.video?.sm?.video &&
                !data.video?.sm?.externalUrl && (
                  <ImageRenderer data={{image: data.image}} />
                )
              }
              infoList={
                data?.infoList?.length > 0 && (
                  <ul>
                    {data.infoList.map((item, index) => (
                      <li key={index}>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                )
              }
              isLandingPage={data.isLandingPage}
              type={data.fill}
              video={data.video ? <VideoRenderer data={data.video} /> : null}
            />
          )}
          {data.showParallaxProduct && (
            <Section colorTheme={data.colorTheme}>
              <LazyMotion features={domAnimation}>
                <ParallaxProductSection
                  darkMode={darkMode}
                  logoImage={
                    (data.parallax.logoImage as any)?.image?.asset?.asset
                      ?._ref &&
                    getImageUrl(
                      (data.parallax.logoImage as any).image.asset?.asset?._ref,
                      env,
                    )
                  }
                  logoImageAlt={
                    data.parallax?.logoImage &&
                    (data.parallax.logoImage as any).image.name
                  }
                  productImage={getImageUrl(
                    (data.parallax.productImage as any)?.image?.asset?.asset
                      ?._ref ?? '',
                    env,
                  )}
                  productImageAlt={
                    (data.parallax.productImage as any).image.name
                  }
                />
              </LazyMotion>
            </Section>
          )}
        </Suspense>
      </Section>
    </>
  );
}
