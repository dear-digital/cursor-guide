import {defineField} from 'sanity';
import {isClosedField, hoursField} from './openingHoursObject';

export function openingHoursTextObject(name = 'openingHoursText') {
  return defineField({
    name,
    title: 'Opening Hours visually',
    type: 'array',
    of: [openingHourObject()],
  });
}

function openingHourObject() {
  return defineField({
    name: 'openinghour',
    type: 'object',
    fields: [
      defineField({
        name: 'day',
        title: 'Day',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      isClosedField(),
      defineField({
        name: 'hours',
        title: 'Hours',
        type: 'string',
      }),
    ],
    preview: {
      select: {
        day: 'day',
        isClosed: 'isClosed',
        
      },
      prepare({day, isClosed}) {
        if (isClosed) {
          return {
            title: day,
            subtitle: 'Closed',
          };
        }
        return {
          title: day,
          subtitle: day,
        };
      },
    },
  });
}
