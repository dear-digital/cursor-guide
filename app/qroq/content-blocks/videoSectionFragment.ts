import type {Selection} from 'groqd';

import {q} from 'groqd';

import {sectionSettingsBlockQuery} from '../blocks/section-settings-query';
import {stringQuery} from '../blocks/string-query';
import { videoResponsiveBlockQuery } from '../blocks/video-responsive-block-query';

export const VIDEO_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('videoSection'),
  settings: sectionSettingsBlockQuery(),
  video: videoResponsiveBlockQuery(),
  videoWidthBlock: q.string(),
} satisfies Selection;
