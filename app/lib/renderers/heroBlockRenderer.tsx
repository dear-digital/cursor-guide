import {HeroComponent} from '~/components/hero-blocks/heroComponent';

export type HeroBlockRendererProps = {
  heroBlocks: null | Record<string, never>[] | undefined;
};

export function HeroBlockRenderer({heroBlocks}: HeroBlockRendererProps) {
  if (!heroBlocks || heroBlocks.length < 1) {
    return null;
  }

  return heroBlocks.map((block, index) => (
    <HeroComponent data={block} index={index} key={block._key} />
  ));
}

export default HeroBlockRenderer;
