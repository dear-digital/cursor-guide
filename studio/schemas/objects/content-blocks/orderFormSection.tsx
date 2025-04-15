import {defineField} from 'sanity';
import {sectionSettingsBlock} from '../blocks/sectionSettingsBlock';
import {titleBlock} from '../blocks/titleBlock';
import {textBlock} from '../blocks/textBaseBlock';
import { colorThemeBlock } from '../blocks/colorTheme';
import { imageResponsiveBlock } from '../blocks/imageResponsiveBlock';
import { linkInternationalizedBlock } from '../blocks/linkInternationalizedBlock';

export default defineField({
  name: 'orderFormSection',
  title: 'Order Form',
  type: 'object',
  fields: [
    titleBlock(),
    imageResponsiveBlock(),
    textBlock('formSubmittedMessage'),
    textBlock('formErrorMessage'),
    defineField({
      title: 'Submit Button Label',
      name: 'submitButtonLabel',
      type: 'internationalizedArrayString',
    }),
    sectionSettingsBlock(),
    colorThemeBlock(),
    linkInternationalizedBlock(),
  ],
  preview: {
    select: {
      settings: 'settings',
    },
    prepare() {
      return {
        title: 'Order Form',
      };
    },
  },
});
