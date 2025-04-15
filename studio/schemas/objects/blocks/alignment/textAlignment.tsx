import {defineField} from 'sanity';

export default defineField({
  name: 'textAlignment',
  type: 'string',
  title: 'Text alignment',
  options: {
    list: [
      {
        title: 'Left',
        value: 'left',
      },
      {
        title: 'Center',
        value: 'center',
      },
      {
        title: 'Right',
        value: 'right',
      },
    ],
  },
  initialValue: 'left',
});
