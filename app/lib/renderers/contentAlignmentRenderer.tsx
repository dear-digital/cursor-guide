import type {TypeFromSelection} from 'groqd';

import {PortableText} from '@portabletext/react';

import {contentAlignmentHorizontalResponsiveBlockQuery} from '~/qroq/alignment/content-alignment-horizontal-responsive';

export const contentAlignmentProps = {
  alignment: contentAlignmentHorizontalResponsiveBlockQuery(),
};

export type ContentAlignmentRendererProps = {
  children?: React.ReactNode;
  className?: string;
} & TypeFromSelection<
  typeof contentAlignmentProps
>;

export default function ContentAlignmentRenderer({
  alignment,
  children,
  className,
}: ContentAlignmentRendererProps) {
  const getAlignmentClasses = (size: 'lg' | 'sm') => {
    if (!alignment?.[size]) return '';

    // Helper function to sanitize the input values
    const sanitizeInput = (value: string | undefined) => {
      return value?.replace(/[^\w-]/g, ''); // Remove unexpected characters
    };

    // Sanitize the inputs
    const horizontal = sanitizeInput(alignment[size]?.horizontal);
    const vertical = sanitizeInput(alignment[size]?.vertical);

    const justifyClasses = {
      end: 'justify-end',
      middle: 'justify-center',
      start: 'justify-start',
    }[horizontal || 'start'];

    const alignClasses = {
      end: 'items-end',
      middle: 'items-center',
      start: 'items-start',
    }[vertical || 'start'];

    // Apply the `lg:` prefix if the size is `lg`
    const prefix = size === 'lg' ? 'lg:' : '';
    return `${prefix}${justifyClasses || ''} ${prefix}${alignClasses || ''}`;
  };

  return (
    <div
      className={`flex h-full ${getAlignmentClasses('sm')} ${getAlignmentClasses('lg')} ${className}`}
    >
      {children || <PortableText value={[]} />}
    </div>
  );
}
