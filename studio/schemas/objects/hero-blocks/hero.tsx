import {defineField} from 'sanity';
import headlineBlock from '../blocks/headlineBlock';
import {imageResponsiveBlock} from '../blocks/imageResponsiveBlock';
import {linksInternationalizedBlock} from '../blocks/linksInternationalizedBlock';
import {parallaxBlock} from '../blocks/parallaxBlock';
import {videoResponsiveBlock} from '../blocks/videoResponsiveBlock';
import { colorThemeBlock } from '../blocks/colorTheme';
import { stickyProductBar } from '../blocks/stickyProductBar';

export default defineField({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    imageResponsiveBlock(),
    videoResponsiveBlock(),
    headlineBlock(),
    stickyProductBar(),
    defineField({
      name: 'infoList',
      title: 'Info list',
      type: 'array',
      of: [{type: 'string'}],
    }),
    linksInternationalizedBlock(),
    defineField({
      name: 'isLandingPage',
      title: 'Is landing page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fill',
      title: 'Fill',
      type: 'string',
      options: {
        list: ['imageFill', 'colorFill'],
      },
      initialValue: 'imageFill',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background color',
      type: 'string',
      options: {
        list: ['lightGrey', 'blue', 'green', 'orange', 'red', 'white', 'black'],
      },
      initialValue: 'lightGrey',
    }),
    defineField({
      name: 'showParallaxProduct',
      title: 'Show parallax product',
      type: 'boolean',
      initialValue: false,
    }),
    parallaxBlock(),
    colorThemeBlock(),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero',
      };
    },
  },
});
