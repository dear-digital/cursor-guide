import {q} from 'groqd';

export function booleanQuery() {
  return q.boolean().nullable();
}
