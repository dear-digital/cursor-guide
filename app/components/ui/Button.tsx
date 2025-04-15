import {Slot} from '@radix-ui/react-slot';
import type {VariantProps} from 'class-variance-authority';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '~/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center font-semibold select-none justify-center whitespace-nowrap ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'base',
      variant: 'primary',
    },
    variants: {
      size: {
        base: 'rounded-full px-10 text-base',
        small: 'rounded-full px-6 text-lg',
        large: 'rounded-full px-6 text-sm',
      },
      variant: {
        ghost: ' shadow-none  [box-shadow:0_0_#0000]',
        link: 'text-primary underline-offset-4  touch:active:underline [box-shadow:0_0_#0000]',
        primary: 'bg-primary text-light  ',
        light: 'bg-light text-dark ',
        lightOutline: 'bg-light text-dark ',
        dark: 'bg-dark text-light',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({asChild = false, className, size, variant, children, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({className, size, variant}))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const iconButtonClass = buttonVariants({size: 'base', variant: 'ghost'});

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(iconButtonClass, className)} ref={ref} {...props} />
    );
  },
);
IconButton.displayName = 'IconButton';

export {Button, IconButton};
