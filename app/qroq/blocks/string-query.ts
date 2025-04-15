import {q} from 'groqd';

export function stringQuery() {
  return q.string().nullable();
}
