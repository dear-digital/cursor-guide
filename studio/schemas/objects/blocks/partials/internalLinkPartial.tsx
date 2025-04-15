import {defineField} from 'sanity';

export default defineField({
  name: 'internalLinkPartial',
  title: 'Internal link',
  type: 'reference',
  to: [
    {type: 'home'},
    {type: 'page'},
    {type: 'product'},
    {type: 'collection'},
  ],
});
