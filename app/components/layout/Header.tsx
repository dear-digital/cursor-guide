import {
  AdvisorDropdownMenuItem,
  Button,
  HeaderButton,
  Menu,
  NavItem,
  Thermomix,
  User,
  Vorwerk,
  Header as VorwerkHeader,
} from '@vorwerk/fibre-react';
import {domAnimation, LazyMotion} from 'framer-motion';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import TextRenderer from '~/lib/renderers/textRenderer';
import {useRootLoaderData} from '~/root';

import {IconAccount} from '../icons/IconAccount';
import {CartDrawer} from './CartDrawer';

export function Header() {
  const {locale, sanityRoot, seo} = useRootLoaderData();
  const {themeContent} = useSanityThemeContent();
  const data = sanityRoot?.data;
  const header = data?.header;
  const slug = seo?.url?.split('/')?.slice(3)?.join('/') || '';

  const generateInternalLink = (slug: string, documentType: string) => {
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

  const generateLink = (link: any) => {
    if (!link || !link.link) {
      return link?.url || '';
    }
    return link.link.slug?.current && link.link.documentType
      ? generateInternalLink(link.link.slug.current, link.link.documentType)
      : '';
  };

  const generateTopLevelLink = (link: any) => {
    if (!link || !link.url) return '';

    if (
      link.url.internalLink?.slug?.current &&
      link.url.internalLink?.documentType
    ) {
      return generateInternalLink(
        link.url.internalLink.slug.current,
        link.url.internalLink.documentType,
      );
    } else if (link.url.externalLink) {
      return link.url.externalLink;
    }

    return '';
  };

  const transparentHeader = [
    `${locale.pathPrefix}/tm7-landing`,
  ].some((path) => `/${slug}` === path);

  const isLandingPage = [
    `${locale.pathPrefix}/tm7-landing`,
  ].some((path) => `/${slug}` === path);

  const navigation = header?.menu?.items?.map((item, index) =>
    item?.subItems?.length > 0 ? (
      <NavItem
        href="#"
        key={index}
        label={typeof item?.title === 'string' ? item.title : ''}
        level={1}
        navItems={item.subItems.map((subItem, subIndex) => (
          <NavItem
            href="#"
            key={subIndex}
            label={typeof subItem?.title === 'string' ? subItem.title : ''}
            level={2}
            navItems={
              subItem?.links?.length > 0
                ? subItem.links.map((link, linkIndex) => (
                    <NavItem
                      href={generateLink(link)}
                      key={linkIndex}
                      label={typeof link?.name === 'string' ? link.name : ''}
                      level={3}
                    />
                  ))
                : undefined
            }
          />
        ))}
      />
    ) : item?.link ? (
      <li className="zf6z1h1" key={index}>
        <a
          className="zf6z1h3 zf6z1h2"
          href={generateTopLevelLink(item?.link)}
          rel={item.link?.url?.externalLink ? 'noreferrer' : undefined}
          target={item.link?.url?.externalLink ? '_blank' : undefined}
        >
          {typeof item.title === 'string' ? item.title : ''}
        </a>
      </li>
    ) : null,
  );

  return (
    <>
      {header?.announcement?.showAnnouncement && (
        <div className="w-full bg-toolbar py-2 text-center">
          {header?.announcement?.link ? (
            <a className="underline" href={header.announcement.link as string}>
              {header?.announcement?.label as string}
            </a>
          ) : (
            <p>{header?.announcement?.label as string}</p>
          )}
        </div>
      )}
      <div className={`${transparentHeader ? 'absolute mt-16 w-full' : ''}`}>
        <LazyMotion features={domAnimation}>
          <VorwerkHeader
            advisor={
              <AdvisorDropdownMenuItem
                className="hover:bg-transparent"
                href="https://shopify.com/91047919889/account"
                icon={<IconAccount />}
                labels={null}
                referrerPolicy="no-referrer"
                target="_blank"
              />
            }
            backgroundType={
              transparentHeader ? 'invertedTransparent' : 'solidWhite'
            }
            cart={
              <HeaderButton
                children={<CartDrawer />}
                label={themeContent?.cart?.heading || ''}
              />
            }
            isLandingPage={isLandingPage}
            landingPageLogo={
              <a href="/">
                <Thermomix size="small" />
              </a>
            }
            logo={
              <a href={`${locale.pathPrefix}/`}>
                <Vorwerk />
              </a>
            }
            menu={<HeaderButton children={<Menu />} label="Menu" />}
            mobileAccountButton={
              <Button buttonStyle="transparent" icon={<User />} size="large">
                <a
                  href="https://shopify.com/91047919889/account"
                  rel="noreferrer"
                  target="_blank"
                >
                  Account
                </a>
              </Button>
            }
            navigation={navigation}
            search={null}
          />
        </LazyMotion>
      </div>
    </>
  );
}