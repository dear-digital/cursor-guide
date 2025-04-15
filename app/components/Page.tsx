import type {ContentBlockRendererProps} from '~/lib/renderers/contentBlockRenderer';
import type {HeroBlockRendererProps} from '~/lib/renderers/heroBlockRenderer';

import ContentBlockRenderer from '~/lib/renderers/contentBlockRenderer';
import HeroBlockRenderer from '~/lib/renderers/heroBlockRenderer';

type PageRendererProps = ContentBlockRendererProps & HeroBlockRendererProps;

export function PageRenderer(props: PageRendererProps) {
  return (
    <div>
      <HeroBlockRenderer {...props} />
      <ContentBlockRenderer {...props} />
    </div>
  );
}

export default PageRenderer;
