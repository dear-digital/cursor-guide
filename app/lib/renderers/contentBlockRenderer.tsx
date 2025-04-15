import {ContentBlockComponent} from '~/components/content-blocks/ContentBlockComponent';

export type ContentBlockRendererProps = {
  contentBlocks: null | Record<string, never>[] | undefined;
};

export function ContentBlockRenderer({
  contentBlocks,
}: ContentBlockRendererProps) {
  if (!contentBlocks || contentBlocks.length < 1) {
    return null;
  }

  return contentBlocks.map((section, index) => (
    <ContentBlockComponent data={section} index={index} key={index} />
  ));
}

export default ContentBlockRenderer;
