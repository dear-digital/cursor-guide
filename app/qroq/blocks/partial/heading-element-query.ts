import { q } from 'groqd';

export function headingElementQuery(name = 'headingElement') {
  return q('headingElement').nullable()
}
