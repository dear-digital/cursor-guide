import { Hero } from '~/components/hero-blocks/Hero';
import { ImageTextOverlayHero } from '~/components/hero-blocks/imageTextOverlay';

export const heroBlockResolver: {
  [key: string]: React.FC<any>;
} = {
  hero: Hero,
  imageTextOverlayHero: ImageTextOverlayHero,
};
