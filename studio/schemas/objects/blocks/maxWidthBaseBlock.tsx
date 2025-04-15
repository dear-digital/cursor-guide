import {defineField} from 'sanity';

export default defineField({
  name: 'maxWidth',
  title: 'Content Max Width',
  type: 'rangeSlider',
  options: {
    min: 0,
    max: 1920,
    suffix: 'px',
  },
});
