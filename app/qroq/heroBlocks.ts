import { HERO_FRAGMENT } from './hero-blocks/heroFragment';
import { IMAGE_TEXT_OVERLAY_HERO_FRAGMENT } from './hero-blocks/imageTextOverlayHeroFragment';

export const HERO_BLOCKS_LIST_SELECTION = {
  "_type == 'hero'": HERO_FRAGMENT,
  "_type == 'imageTextOverlayHero'": IMAGE_TEXT_OVERLAY_HERO_FRAGMENT,
};
