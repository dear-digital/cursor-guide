import {defineField} from 'sanity';

export function openingHoursObject(name = 'openingHours') {
  return defineField({
    name,
    title: 'Opening Hours',
    type: 'array',
    of: [
      openingHourObject(),
    ],
  });
}

export function openingHourObject() {
  return defineField({
    name: 'openinghour',
    type: 'object',
    fields: [
      dayField(),
      isClosedField(),
      hoursField(),
    ],
    preview: {
      select: {
        day: 'day',
        isClosed: 'isClosed',
        hours: 'hours',
      },
      prepare({ day, isClosed, hours }) {
        if (isClosed) {
          return {
            title: day,
            subtitle: 'Closed',
          };
        }
        const hoursText =
          hours?.length
            ? hours.map(({ open, close }: { open: string; close: string }) => `${open}–${close}`).join(', ')
            : 'No hours';
        return {
          title: day,
          subtitle: hoursText,
        };
      },
    },
  });
}

export function dayField(name = 'day') {
  return defineField({
    name,
    title: 'Day',
    type: 'string',
    options: {
      list: [
        { title: 'Monday', value: 'monday' },
        { title: 'Tuesday', value: 'tuesday' },
        { title: 'Wednesday', value: 'wednesday' },
        { title: 'Thursday', value: 'thursday' },
        { title: 'Friday', value: 'friday' },
        { title: 'Saturday', value: 'saturday' },
        { title: 'Sunday', value: 'sunday' },
      ],
    },
    validation: Rule => Rule.required(),
  });
}

export function isClosedField(name = 'isClosed') {
  return defineField({
    name,
    title: 'Closed',
    type: 'boolean',
    initialValue: false,
    description: 'Check if the shop is closed on this day.',
  });
}

export function hoursField(name = 'hours') {
  return defineField({
    name,
    title: 'Hours',
    type: 'array',
    of: [
      hoursObject(),
    ],
    hidden: ({ parent }) => parent?.isClosed === true,
  });
}

export function hoursObject() {
  return defineField({
    name: 'openingTime',
    type: 'object',
    fields: [
      {
        name: 'open',
        title: 'Open Time',
        type: 'string',
        description: 'Opening time (e.g., 09:00)',
        validation: Rule => Rule.required().regex(/^\d{1,2}:\d{2}$/, 'time').error('Must be in HH:mm format (e.g., 09:00)'),
      },
      {
        name: 'close',
        title: 'Close Time',
        type: 'string',
        description: 'Closing time (e.g., 18:00)',
        validation: Rule => Rule.required().regex(/^\d{1,2}:\d{2}$/, 'Must be in HH:mm format (e.g., 18:00)'),
      },
    ],
    preview: {
      select: {
        open: 'open',
        close: 'close',
      },
      prepare({ open, close }) {
        return {
          title: `${open} – ${close}`,
        };
      },
    },
  });
}
