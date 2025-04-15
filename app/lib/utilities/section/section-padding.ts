import { sanitize } from '../sanitize';

export function getSectionPaddingClass({
  top = 'base',
  bottom = 'base',
}: { top?: string | null; bottom?: string | null } = {}): string {
  const paddingClasses: Record<string, string> = {
    small: 'my-6 lg:my-6',
    base: 'my-8 lg:my-10',
    large: 'my-10 lg:my-20',
    none: 'my-0',
  };

  const topPadding = paddingClasses[sanitize(top) ?? 'base'];
  const bottomPadding = paddingClasses[sanitize(bottom) ?? 'base'];

  return `${topPadding} ${bottomPadding}`;
}


