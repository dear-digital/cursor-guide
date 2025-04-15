import { q } from 'groqd';
import { getIntValue } from '../utils';
import { stringQuery } from '../blocks/string-query';

export function addressSelector(name = 'address') {
  return q(name).grab({
    streetName: [getIntValue('streetName'), stringQuery()],
    city: [getIntValue('city'), stringQuery()],
    googleMapsUrl: q.string(),
  });
}
