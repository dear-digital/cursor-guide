import {q} from 'groqd';

export const FEATURE_GRID_FRAGMENT = q('featureGrid').grab({
  _key: q.string(),
  _type: q.literal('featureGrid'),
  features: q('features[]', {isArray: true}).grab({
    description: q.string(),
    icon: q.string(),
    title: q.string(),
  }),
  subtitle: q.string().nullable(),
  title: q.string().nullable(),
}); 