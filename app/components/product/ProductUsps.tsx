import {Calendar, CheckmarkCircle, Delivery} from '@vorwerk/fibre-react';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';

export function ProductUsps() {
  const {themeContent} = useSanityThemeContent();

  const usps = themeContent?.product?.USPS || [];

  if (!usps.length) return null;

  return (
    <div className="text-sm text-contentPrimary leading-snug">
      <div className="flex flex-col gap-4">
        {usps.map((usp, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <div className="h-6 w-6">
              {usp.productUspLogo === 'Calendar' && <Calendar />}
              {usp.productUspLogo === 'CheckmarkCircle' && <CheckmarkCircle />}
              {usp.productUspLogo === 'Delivery' && <Delivery />}
            </div>
            {usp.productUsp}
          </div>
        ))}
      </div>
    </div>
  );
}
