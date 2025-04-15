import {cx} from 'class-variance-authority';
import {forwardRef} from 'react';

import {cn} from '~/lib/utils';

import type {ButtonProps} from './ui/Button';

import {IconButton} from './ui/Button';
export function QuantitySelector(props: {children: React.ReactNode}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center border border-black rounded-full',
      )}
    >
      {props.children}
    </div>
  );
}

const QuantityButton = forwardRef<
  HTMLButtonElement,
  {
    symbol: 'decrease' | 'increase';
  } & ButtonProps
>(({className, symbol, variant, ...props}, ref) => {
  return (
    <IconButton
      aria-label={cx([
        symbol === 'decrease' && 'Decrease quantity',
        symbol === 'increase' && 'Increase quantity',
      ])}
      className={cn([
        'px-4 py-2 text-base',
        symbol === 'decrease'
          ? 'rounded-br-none rounded-tr-none !border-r-0'
          : 'rounded-bl-none rounded-tl-none !border-l-0',
        className,
      ])}
      name={cx([
        symbol === 'decrease' && 'decrease-quantity',
        symbol === 'increase' && 'increase-quantity',
      ])}
      ref={ref}
      {...props}
    >
      <span className="group-disabled:opacity-40">
        {
          {
            decrease: <>&#8722;</>,
            increase: <>&#43;</>,
          }[symbol]
        }
      </span>
      {props.children}
    </IconButton>
  );
});
QuantityButton.displayName = 'QuantityButton';

function Value(props: {children: React.ReactNode}) {
  return (
    <div
      className={cn(
        'px-4 py-2 text-base',
      )}
    >
      {props.children}
    </div>
  );
}

QuantitySelector.Button = QuantityButton;
QuantitySelector.Value = Value;
