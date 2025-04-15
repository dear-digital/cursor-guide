import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {cn} from 'app/lib/utils';
import * as React from 'react';

const CheckboxSquare = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({className, ...props}, ref) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer flex h-5 w-5 shrink-0 justify-center rounded-base border border-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white data-[state=checked]:text-primary-foreground',
      className,
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'flex h-full w-full items-center justify-center text-current',
      )}
    >
      <div className="size-4 rounded bg-grey-2"></div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CheckboxSquare.displayName = CheckboxPrimitive.Root.displayName;

export {CheckboxSquare};
