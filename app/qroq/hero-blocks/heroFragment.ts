import type { Selection } from 'groqd';

import { q } from 'groqd';

import { imageResponsiveBlockQuery } from '~/qroq/blocks/image-responsive-query';

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { headlineBlockQuery } from '../blocks/headlineblock-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { linksBlockQuery } from '../blocks/linksblock-query';
import { videoResponsiveBlockQuery } from '../blocks/video-responsive-block-query';
import { IMAGE_RESPONSIVE_BLOCK_FRAGMENT } from '../content-blocks/functionsTabSectionFragment';
import { getIntValue } from '../utils';

export const HERO_FRAGMENT = {
  _key: q.string(),
  _type: q.literal('hero'),
  backgroundColor: q.union([
    q.literal('orange'),
    q.literal('lightGrey'),
    q.literal('red'),
    q.literal('blue'),
    q.literal('black'),
    q.literal('white'),
    q.literal('green'),
  ]).default('lightGrey').optional(),
  colorTheme: colorThemeBlockQuery(),
  fill: q.union([
    q.literal('imageFill'),
    q.literal('colorFill'),
  ]),
  headlineBlock: headlineBlockQuery(),
  image: imageResponsiveBlockQuery(),
  infoList: q.array(q.string()),
  isLandingPage: q.boolean(),
  linksBlock: linksBlockQuery(),
  parallax: q.object({
    darkMode: q.boolean(),
    logoImage: q.object({
      asset: q.object({
        _ref: q.string(),
        _type: q.literal('reference'),
      }).optional(),
      name: q.string().optional(),
      ratio: q.object({
        height: q.number().optional(),
        width: q.number().optional(),
      }).optional(),
    }),
    productImage: q.object({
      asset: q.object({
        _ref: q.string(),
        _type: q.literal('reference'),
      }).optional(),
      name: q.string().optional(),
      ratio: q.object({
        height: q.number().optional(),
        width: q.number().optional(),
      }).optional(),
    })
  }),
  showParallaxProduct: q.boolean(),
  stickyProductBar: q('stickyProductBar')
    .grab({
      image: q.object(IMAGE_RESPONSIVE_BLOCK_FRAGMENT).optional(),
      linkBlock: linkBlockQuery(),
      showStickyProductBar: q.boolean().nullable(),
      subtitle: [getIntValue('subtitle'), q.string().nullable()],
      title: [getIntValue('title'), q.string().nullable()],
    }),
  video: videoResponsiveBlockQuery(),
} satisfies Selection;