import type {CartApiQueryFragment} from 'storefrontapi.generated';

import {useMemo} from 'react';

import {useSanityThemeContent} from '~/hooks/useSanityThemeContent';
import {cn} from '~/lib/utils';

import type {CartLayouts} from './Cart';

import {ShopifyMoney} from '../ShopifyMoney';
import {Card, CardContent} from '../ui/Card';

export function CartSummary({
  children = null,
  cost,
  layout,
}: {
  children?: React.ReactNode;
  cost?: CartApiQueryFragment['cost'];
  layout: CartLayouts;
}) {
  const {themeContent} = useSanityThemeContent();

  const Content = useMemo(
    () => (
      <div
        aria-labelledby="summary-heading"
        className={cn([
          layout === 'drawer' && 'grid gap-4 border-t border-border py-6',
          layout === 'page' && 'grid gap-6',
        ])}
      >
        <h2 className="sr-only">{themeContent?.cart?.orderSummary}</h2>
        <dl className="grid">
          <div className="flex items-center justify-between text-lg font-medium">
            <span>{themeContent?.cart?.subtotal}</span>
            {cost?.subtotalAmount &&
              parseFloat(cost.subtotalAmount.amount) > 0 && (
                <span>
                  <ShopifyMoney data={cost?.subtotalAmount} />
                </span>
              )}
          </div>
        </dl>
        {children}
      </div>
    ),
    [children, cost?.subtotalAmount, layout, themeContent],
  );

  if (layout === 'drawer') {
    return Content;
  }

  return (
    <Card className="mt-5">
      <CardContent className="px-5 py-6 lg:p-8">{Content}</CardContent>
    </Card>
  );
}
