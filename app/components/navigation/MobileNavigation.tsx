import type {TypeFromSelection} from 'groqd';

import {Link} from '@remix-run/react';
import {useCallback, useState} from 'react';

import type {SUB_MENU_FRAGMENT} from '~/qroq/links';

import {useLocalePath} from '~/hooks/useLocalePath';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import {cn} from '~/lib/utils';

import type {NavigationProps} from './DesktopNavigation';
import type {SanityNestedNavigationProps} from './NestedNavigation';

import {IconChevron} from '../icons/IconChevron';
import {IconClose} from '../icons/IconClose';
import {IconMenu} from '../icons/IconMenu';
import {Logo} from '../layout/Logo';
import {SanityExternalLink} from '../sanity/link/SanityExternalLink';
import {SanityInternalLink} from '../sanity/link/SanityInternalLink';
import {SocialMediaButtons} from '../SocialMedia';
import {iconButtonClass} from '../ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerNestedRoot,
  DrawerTrigger,
} from '../ui/Drawer';
import {ScrollArea} from '../ui/ScrollArea';
import {getHeaderColorScheme} from './HeaderColorScheme';

const mobileMenuLinkClass = cn(
  'flex rounded-sm items-center gap-2 w-full transition-colors leading-12',
);

export function MobileNavigation(props: {
  colorSchemeName: string;
  data?: NavigationProps;
  headerButtonLink?: any;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  const colorScheme = getHeaderColorScheme(props.colorSchemeName);

  if (!props.data) return null;

  return (
    <div className="touch:block">
      <Drawer direction={'right'} onOpenChange={setOpen} open={open}>
        <DrawerTrigger
          className={cn(
            iconButtonClass,
            `group ml-4 items-center border-2 ${colorScheme.border} h-12 w-12 p-2 hover:border-primary`,
          )}
        >
          <IconMenu
            className={`size-7 ${colorScheme.logo} group-hover:text-primary`}
            strokeWidth={2}
          />
        </DrawerTrigger>
        <MobileNavigationContent
          colorSchemeName={props.colorSchemeName}
          headerButtonLink={props.headerButtonLink}
        >
          {props.data &&
            props.data?.length > 0 &&
            props.data?.map((item) => (
              <li key={item._key}>
                {item._type === 'internalLink' && (
                  <SanityInternalLink
                    className={`${mobileMenuLinkClass} text-highlight relative w-fit`}
                    data={item}
                    onClick={handleClose}
                  />
                )}
                {item._type === 'externalLink' && (
                  <SanityExternalLink
                    className="text-highlight relative w-fit"
                    data={item}
                  />
                )}
                {item._type === 'nestedNavigation' && (
                  <MobileNavigationNested data={item} onClose={handleClose} />
                )}
                {item._type === 'subMenu' && (
                  <MobileNavigationSubMenu data={item} onClose={handleClose} />
                )}
              </li>
            ))}
        </MobileNavigationContent>
      </Drawer>
    </div>
  );
}

function MobileNavigationContent(props: {
  children: React.ReactNode;
  className?: string;
  colorSchemeName?: string;
  headerButtonLink?: any;
  setOpen?: (open: boolean) => void;
}) {
  const {children, className, headerButtonLink, setOpen} = props;
  const homePath = useLocalePath({path: '/'});

  return (
    <DrawerContent
      className={cn([
        'h-[--dialog-content-height] max-h-screen w-screen bg-navBlue text-white',
        '[--dialog-content-height:calc(100svh_*_.75)] [--dialog-content-max-width:calc(32rem)]',
        'h-full lg:left-auto lg:right-0 lg:[--dialog-content-height:100svh]',
        className,
      ])}
      onCloseAutoFocus={(e) => e.preventDefault()}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div className="size-full space-y-20 overflow-hidden">
        <div className="flex items-center justify-between">
          <Link className="group" prefetch="intent" to={homePath}>
            <Logo className={`h-auto w-[var(--logoWidth)] text-white`} />
          </Link>
          <div className="flex gap-4">
            <div className="hidden md:block">
              {headerButtonLink && (
                <ButtonRenderer data={{link: headerButtonLink}} />
              )}
            </div>

            <DrawerClose
              className={cn(
                iconButtonClass,
                `inline-flex h-12 w-12 border-2 border-white p-2`,
              )}
            >
              <IconClose
                className={`size-6 text-white`}
                onClick={() => setOpen && setOpen(false)}
                strokeWidth={2}
              />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </div>
        </div>
        <ScrollArea className="size-full pr-4">
          <nav>
            <ul className="flex flex-col gap-4 pb-6 text-xl font-medium lg:text-3xl">
              {children}
            </ul>
          </nav>
        </ScrollArea>
      </div>
      <div className="flex flex-col items-end gap-10">
        <div className="flex flex-wrap items-center justify-end gap-6">
          <SocialMediaButtons />
        </div>
        <div className="md:hidden">
          {headerButtonLink && (
            <ButtonRenderer data={{link: headerButtonLink}} />
          )}
        </div>
      </div>
    </DrawerContent>
  );
}

function MobileNavigationNested(props: {
  data?: SanityNestedNavigationProps;
  onClose: () => void;
}) {
  const {data, onClose} = props;
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    onClose();
    setOpen(false);
  }, [onClose]);

  if (!data) return null;

  const {childLinks} = data;

  return data.name && childLinks && childLinks.length > 0 ? (
    <DrawerNestedRoot direction={'right'} onOpenChange={setOpen} open={open}>
      <DrawerTrigger
        className={mobileMenuLinkClass}
        onClick={() => setOpen(true)}
      >
        {data.name}
        <span>
          <IconChevron className="size-5" direction="right" />
        </span>
      </DrawerTrigger>
      <MobileNavigationContent className={cn([''])} setOpen={setOpen}>
        <li
          className="underline-offset-15 flex cursor-pointer items-center gap-1 text-xl font-semibold underline"
          onClick={() => setOpen(false)}
        >
          <IconChevron className="size-5" direction="left" />
          {data.name}
        </li>
        {childLinks &&
          childLinks.length > 0 &&
          childLinks.map((child) => (
            <li
              className="text-highlight relative w-fit text-xl font-semibold"
              key={child._key}
            >
              {child._type === 'internalLink' ? (
                <SanityInternalLink
                  className={mobileMenuLinkClass}
                  data={child}
                  onClick={handleClose}
                />
              ) : child._type === 'externalLink' ? (
                <SanityExternalLink
                  className={mobileMenuLinkClass}
                  data={child}
                />
              ) : null}
            </li>
          ))}
      </MobileNavigationContent>
    </DrawerNestedRoot>
  ) : data.link && data.name && (!childLinks || childLinks.length === 0) ? (
    // Render internal link if no child links
    <SanityInternalLink
      className={mobileMenuLinkClass}
      data={{
        _key: data._key,
        _type: 'internalLink',
        anchor: null,
        link: data.link,
        name: data.name,
      }}
      onClick={handleClose}
    >
      {data.name}
    </SanityInternalLink>
  ) : null;
}

export type SanitySubMenuNavigationProps = TypeFromSelection<
  typeof SUB_MENU_FRAGMENT
>;

function MobileNavigationSubMenu(props: {
  data?: SanitySubMenuNavigationProps;
  onClose: () => void;
}) {
  const {data, onClose} = props;
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
    setOpen(false);
  }, [onClose]);

  if (!data) return null;

  const {links} = data;

  return links && links.length > 0 ? (
    <DrawerNestedRoot direction={'right'} onOpenChange={setOpen} open={open}>
      <ul className="flex flex-col gap-2 pb-6 pt-4 text-base font-medium lg:text-xl lg:leading-9">
        {data.links.map((link) => (
          <li className="text-highlight relative w-fit" key={link._key}>
            {link._type === 'internalLink' ? (
              <SanityInternalLink
                className={mobileMenuLinkClass}
                data={link}
                onClick={handleClose}
              />
            ) : link._type === 'externalLink' ? (
              <SanityExternalLink className={mobileMenuLinkClass} data={link} />
            ) : null}
          </li>
        ))}
      </ul>
    </DrawerNestedRoot>
  ) : null;
}
