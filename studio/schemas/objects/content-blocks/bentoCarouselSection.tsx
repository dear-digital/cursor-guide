import { defineField } from "sanity";
import { bentoCarouselSlideBlock } from "../blocks/bentoCarouselSlideBlock";
import { colorThemeBlock } from "../blocks/colorTheme";
import headlineBlock from "../blocks/headlineBlock";

export default defineField({
  name: 'bentoCarouselSection',
  title: 'Bento Box Carousel',
  type: 'object',
  fields: [
    headlineBlock(),
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [bentoCarouselSlideBlock()],
    },
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Bento Box Carousel',
      };
    },
  }
})