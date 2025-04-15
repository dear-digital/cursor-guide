import {defineField} from 'sanity';
import {bentoCarouselTileBlock} from './bentoCarouselTileBlock';

export function bentoCarouselSlideBlock(name = 'bentoCarouselSlideBlock') {
  return defineField({
    name,
    type: 'object',
    fields: [
      {
        name: 'tiles',
        title: 'Tiles',
        type: 'array',
        of: [bentoCarouselTileBlock()],
      },
    ],
    preview: {
      prepare() {
        return {
          title: 'Bento Carousel Slide',
        };
      },
    },
  });
}
