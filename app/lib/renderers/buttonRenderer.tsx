import type {TypeFromSelection} from 'groqd';

import {Button} from '@vorwerk/fibre-react';
import isEmpty from 'lodash.isempty';

import {linkBlockQuery} from '~/qroq/blocks/linkblock-query';
import {useRootLoaderData} from '~/root';

import IconRenderer from './iconRenderer';

export const buttonProps = {
  link: linkBlockQuery(),
};

export type ButtonRendererProps = {
  anchor?: string;
  as?: 'a' | 'button';
  className?: string;
} & TypeFromSelection<typeof buttonProps>;

export default function ButtonRenderer({
  data,
  data: {as = 'button'},
}: {
  className?: string;
  data: ButtonRendererProps;
}) {
  const {locale} = useRootLoaderData();
  if (!data.link) {
    return null;
  }

  if (!data || isEmpty(data.link)) {
    return null;
  }

  const slug = data.link.url?.internalLink?.slug?.current;
  const anchor = data.anchor ? `#${data.anchor}` : '';
  const documentType = data.link.url?.internalLink?.documentType;
  // let componentNode;

  const path: () => string = () => {
    switch (documentType) {
      case 'blogPost':
        return `${locale.pathPrefix}/blog/${slug}`;
      case 'collection':
        return `${locale.pathPrefix}/collections/${slug}`;
      case 'home':
        return locale.pathPrefix || '/';
      case 'location':
        return `${locale.pathPrefix}/locations/${slug}`;
      case 'page':
        return `${locale.pathPrefix}/${slug}`;
      case 'product':
        return `${locale.pathPrefix}/products/${slug}`;
      default:
        return '';
    }
  };

  const label = data.link.label;
  const url =
    data.link.url?.externalLink || data.link.url?.internalLink?.slug?.current;
    
  // If no label provided, don't render anything
  if (!label) {
    return null;
  }

  return (
    <Button
      buttonStyle={data.link.style}
      componentNode={'a'}
      icon={
        data.link.icon ? (
          <IconRenderer data={{name: data.link.icon}} />
        ) : undefined
      }
      iconPosition={data.link.iconPosition}
      invertColors={data.link.invertColors}
      size={data.link.size}
      url={url}
      // size={button.size} // breaks the button layout
    >
      {data.link.url?.externalLink ? (
        <a href={url} rel="noreferrer" target="_blank">
          {label as string}
        </a>
      ) : (
        (label as string)
      )}
    </Button>
  );
}
