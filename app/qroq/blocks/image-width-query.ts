import { q } from 'groqd';

export function imageWidthQuery(name = 'imageWidthBlock') {
  return q(name)
    .grab({
      width: q.string()
    })
}