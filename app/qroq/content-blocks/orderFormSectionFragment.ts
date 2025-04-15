import type { Selection } from 'groqd';

import { q } from 'groqd';

import { colorThemeBlockQuery } from '../blocks/color-theme-query';
import { imageResponsiveBlockQuery } from '../blocks/image-responsive-query';
import { linkBlockQuery } from '../blocks/linkblock-query';
import { sectionSettingsBlockQuery } from '../blocks/section-settings-query';
import { stringQuery } from '../blocks/string-query';
import { textBlockQuery } from '../blocks/text-block-query';
import { titleBlockQuery } from '../blocks/title-query';
import { getIntValue } from '../utils';

export const ORDER_FORM_SECTION_FRAGMENT = {
  _key: stringQuery(),
  _type: q.literal('orderFormSection'),
  colorTheme: colorThemeBlockQuery(),
  formErrorMessage: textBlockQuery('formErrorMessage'),
  formSubmittedMessage: textBlockQuery('formSubmittedMessage'),
  image: imageResponsiveBlockQuery(),
  linkBlock: linkBlockQuery(),
  settings: sectionSettingsBlockQuery(),
  submitButtonLabel: [getIntValue('submitButtonLabel'), q.string().nullable()],
  title: titleBlockQuery(),
} satisfies Selection;
