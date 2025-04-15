
import { q } from 'groqd';

export function contactSelector(name = 'contact') {
  return q(name).grab({
    email: q.string(),
    phone: q.string(),
  });
}
