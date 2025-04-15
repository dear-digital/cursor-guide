import {q} from 'groqd';

export function numberQuery() {
  return q.number().nullable();
}
