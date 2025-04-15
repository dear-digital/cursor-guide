import type {EncodeDataAttributeCallback} from '@sanity/react-loader';
import type {InferType} from 'groqd';

import {createContext, useContext, useMemo} from 'react';

import type {COLLECTION_SECTIONS_FRAGMENT} from '~/qroq/content-blocks/collectionSectionsFragment';
import type {PRODUCT_SECTIONS_FRAGMENT} from '~/qroq/content-blocks/productSectionsFragment';
import type {CONTENT_BLOCKS_FRAGMENT} from '~/qroq/content-blocks/sectionsFragment';
import type {FOOTERS_FRAGMENT} from '~/qroq/footers';

import {useCardColorsCssVars, useColorsCssVars} from '~/hooks/useColorsCssVars';
import {useIsDev} from '~/hooks/useIsDev';
import {contentBlockResolver} from '~/lib/contentBlockResolver';
import {getSectionPaddingClass} from '~/lib/utilities/section/section-padding';

export type ContentBlockComponent =
  | NonNullable<InferType<typeof COLLECTION_SECTIONS_FRAGMENT>>[0]
  | NonNullable<InferType<typeof CONTENT_BLOCKS_FRAGMENT>>[0]
  | NonNullable<InferType<typeof FOOTERS_FRAGMENT>>
  | NonNullable<InferType<typeof PRODUCT_SECTIONS_FRAGMENT>>[0];

type ComponentSectionType = 'footer' | 'section';

export function ContentBlockComponent(props: {
  data: ContentBlockComponent;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  index?: number;
  type?: ComponentSectionType;
}) {
  const {data, encodeDataAttribute} = props;
  const isDev = useIsDev();
  const type = data._type;
  const SectionComponent = useMemo(() => contentBlockResolver[type], [type]);

  if (data.settings?.hide) return null;

  return SectionComponent ? (
    <SectionWrapper
      data={data}
      encodeDataAttribute={encodeDataAttribute}
      index={props.index}
      type={props.type}
    >
      <SectionComponent data={data} encodeDataAttribute={encodeDataAttribute} />
    </SectionWrapper>
  ) : isDev ? (
    <MissingSection type={type} />
  ) : null;
}

function SectionWrapper(props: {
  children: React.ReactNode;
  data: ContentBlockComponent;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  index?: number;
  type?: ComponentSectionType;
}) {
  const {children, data} = props;
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

  const padding = getSectionPaddingClass(data.settings?.padding);

  return props.type === 'footer' ? (
    <footer
      className={`section-padding relative bg-background text-foreground [content-visibility:auto]`}
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
        className={`section ${padding} relative bg-background text-foreground [content-visibility:auto]`}
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
