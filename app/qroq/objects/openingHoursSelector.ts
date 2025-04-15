import { q } from 'groqd';

export const openingHoursSelector = q('openingHours[]', { isArray: true })
  .grab({
    day: q.string(),
    isClosed: q.boolean(),
    hours: q('hours[]', { isArray: true })
      .grab({
        open: q.string(),
        close: q.string(),
      })
      .nullable(),
  });


export const openingHourTextQuery = q('openingHoursText[]', { isArray: true })
  .grab({
    day: q.string(),
    isClosed: q.boolean(),
    hours: q.string().nullable(),
  });