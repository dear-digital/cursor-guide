import type { InferType } from 'groqd';

import type { SETTINGS_FRAGMENT } from '~/qroq/fragments';

import { useRootLoaderData } from '~/root';

import { PeetersLogo } from '../icons/PeetersLogo';

type Logo = InferType<typeof SETTINGS_FRAGMENT.logo>;

export function Logo(props: {
  className?: string;
  loading?: 'eager' | 'lazy';
  sanityEncodeData?: string;
  sizes?: string;
  style?: React.CSSProperties;
  colorScheme?: string;
}) {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data;
  const sanitySettings = data?.settings;
  const logo = sanitySettings?.logo;
  const siteName = sanitySettings?.siteName;
  const header = data?.header;
  const logoWidth = header?.desktopLogoWidth

  if (!logo?._ref) {
    return (
      <div className="flex h-11 items-center justify-start font-heading text-2xl text-white">
        {siteName}
      </div>
    );
  }

  return (
    <PeetersLogo className={`max-w-${logoWidth} w-full max-h-12 ${props.colorScheme}`}  />
  );
}
