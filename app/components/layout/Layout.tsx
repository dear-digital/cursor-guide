import {ShopifyProvider} from '@shopify/hydrogen-react';

import {useRootLoaderData} from '~/root';

import {TogglePreviewMode} from '../sanity/TogglePreviewMode';
import {VisualEditing} from '../sanity/VisualEditing';
import {Footer} from './Footer';
import {FramerMotion} from './FramerMotion';
import {Header} from './Header';
import {NavigationProgressBar} from './NavigationProgressBar';

export type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout({children = null}: LayoutProps) {
  const {env, locale, sanityPreviewMode} = useRootLoaderData();

  return (
    <FramerMotion>
      <NavigationProgressBar />
      <Header />
      <main className="flex min-h-[90vh] grow flex-col gap-y-[calc(var(--space-between-template-sections)*.75)] sm:gap-y-[--space-between-template-sections]">
        {children}
      </main>
      {/* <Footer /> */}
      {sanityPreviewMode ? <VisualEditing /> : <TogglePreviewMode />}
    </FramerMotion>
  );
}
