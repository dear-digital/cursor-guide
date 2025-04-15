import type {EncodeDataAttributeCallback} from '@sanity/react-loader';
import type {InferType} from 'groqd';

import {StickyProductBar} from '@vorwerk/fibre-react';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

import type {HERO_BLOCKS_FRAGMENT} from '~/qroq/hero-blocks/heroBlocksFragment';

import {useCardColorsCssVars, useColorsCssVars} from '~/hooks/useColorsCssVars';
import {useIsDev} from '~/hooks/useIsDev';
import {heroBlockResolver} from '~/lib/heroBlockResolver';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {useRootLoaderData} from '~/root';

export type HeroComponentProps = NonNullable<
  InferType<typeof HERO_BLOCKS_FRAGMENT>
>[0];

type HeroType = 'footer' | 'heroBlock' | 'section';

export function HeroComponent(props: {
  darkMode?: boolean;
  data: HeroComponentProps;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  index?: number;
  type?: HeroType;
}) {
  const {darkMode, data, encodeDataAttribute} = props;
  const isDev = useIsDev();
  const type = data._type;
  const Section = useMemo(() => heroBlockResolver[type], [type]);
  const {env} = useRootLoaderData();

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (data.settings?.hide) return null;

  return Section ? (
    <>
      {data?.stickyProductBar?.showStickyProductBar &&
        (data?.stickyProductBar?.image as any)?.image?.asset?.asset._ref &&
        showStickyBar && (
          <>
            <div className="fixed right-12 top-12 z-50 hidden lg:block">
              <div className="inline-flex items-center justify-between rounded-lg bg-black/75 p-2">
                <div className="mr-4">
                  <img
                    alt="Product"
                    className="h-16 w-16"
                    src={getImageUrl(
                      (data?.stickyProductBar.image as any).image.asset.asset
                        ._ref as string,
                      env,
                    )}
                  />
                </div>
                <div className="pr-12 text-white">
                  <h2 className="text-lg font-bold">
                    {data?.stickyProductBar?.title}
                  </h2>
                  <p className="text-base font-thin">
                    {data?.stickyProductBar?.subtitle}
                  </p>
                </div>
                <div className="pr-2">
                  <ButtonRenderer
                    data={{link: data?.stickyProductBar?.linkBlock}}
                  />
                </div>
              </div>
            </div>
            <div className="sticky-product-bar fixed bottom-0 z-50 lg:hidden w-full p-4 bg-white/60 backdrop-blur">
              <div className='flex justify-between align-middle items-center'>
                <div className="pr-12 text-white">
                  <h2 className="text-lg font-bold">
                    {data.stickyProductBar?.title}
                  </h2>
                  <p className="text-base font-thin">
                    {data.stickyProductBar?.subtitle}
                  </p>
                </div>
                <div className="pr-2">
                  <ButtonRenderer
                    data={{link: data.stickyProductBar?.linkBlock}}
                  />
                </div>
              </div>
            </div>
          </>
        )}

      <SectionWrapper
        darkMode={darkMode}
        data={data}
        encodeDataAttribute={encodeDataAttribute}
        index={props.index}
        type={props.type}
      >
        <Section data={data} encodeDataAttribute={encodeDataAttribute} />
      </SectionWrapper>
    </>
  ) : isDev ? (
    <MissingSection type={type} />
  ) : null;
}

function SectionWrapper(props: {
  children: React.ReactNode;
  darkMode?: boolean;
  data: HeroComponentProps;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  index?: number;
  type?: HeroType;
}) {
  const {children, darkMode, data} = props;
  const isDev = useIsDev();
  const colorsCssVars = useColorsCssVars({
    selector: props.type === 'footer' ? 'footer' : `#section-${data._key}`,
    settings: data?.settings,
  });
  const cardColorsCssVars = useCardColorsCssVars({
    selector: `#section-${data._key} [data-type="card"]`,
    settings: props.data.settings,
  });
  const sectionSelector = `#section-${data._key}`;
  const customCss = data.settings?.customCss?.code
    ? `${sectionSelector} ${data.settings.customCss.code}`
    : '';
  const sectionType = data._type;

  return props.type === 'footer' ? (
    <footer
      className="section-padding relative bg-background text-foreground [content-visibility:auto]"
      data-footer-type={isDev ? sectionType : null}
    >
      <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
      {children}
      {data.settings?.customCss && (
        <style dangerouslySetInnerHTML={{__html: customCss}} />
      )}
    </footer>
  ) : (
    <SectionContext.Provider
      value={{
        encodeDataAttribute: props.encodeDataAttribute,
        id: data._key,
        index: props.index,
      }}
    >
      <section
        className={`section-padding relative ${
          darkMode ? 'bg-contentPrimary' : 'bg-background'
        } text-foreground will-change-transform [content-visibility:auto]`}
        data-section-type={isDev ? sectionType : null}
        id={`section-${data._key}`}
      >
        <style dangerouslySetInnerHTML={{__html: colorsCssVars}} />
        <style dangerouslySetInnerHTML={{__html: cardColorsCssVars}} />
        {children}
        {data.settings?.customCss && (
          <style dangerouslySetInnerHTML={{__html: customCss}} />
        )}
      </section>
    </SectionContext.Provider>
  );
}

export const SectionContext = createContext<{
  encodeDataAttribute?: EncodeDataAttributeCallback;
  id: null | string;
  index?: number;
} | null>(null);

export function useSection() {
  return useContext(SectionContext);
}

function MissingSection(props: {type?: string}) {
  return (
    <section className="w-full bg-slate-800 text-white">
      <div className="container py-10 text-center">
        <div className="rounded-md border-2 border-dashed border-gray-400 px-5 py-10">
          <div>
            The section component{' '}
            {props.type && (
              <strong className="px-2 text-xl">{props.type}</strong>
            )}{' '}
            does not exist yet.
          </div>
        </div>
      </div>
    </section>
  );
}
