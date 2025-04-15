import type { TypeFromSelection } from 'groqd';

import { linkBlockQuery } from '~/qroq/blocks/linkblock-query';
import { useRootLoaderData } from '~/root';

export const linkProps = {
  link: linkBlockQuery(),
};

export type LinkRendererProps = {
  as?: 'a' | 'button';
  className?: string;
} & TypeFromSelection<typeof linkProps>;

export default function LinkRenderer({
  data,
}: {
  className?: string;
  data: LinkRendererProps;
}) {
  const { locale } = useRootLoaderData();

  const slug = data?.link?.url?.internalLink?.slug?.current;
  const documentType = data?.link?.url?.internalLink?.documentType;

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

  const stegaClean = (url: string): string => {
    return url;
  };

  const externalLink = data?.link?.url?.externalLink;
  const url = slug ? stegaClean(`${path()}`) : externalLink;
  const isExternal = !!externalLink;

  return (
    <a
      href={url as string}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {data?.link?.label as string}
    </a>
  );
}