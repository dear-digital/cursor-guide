import type {TypeFromSelection} from 'groqd';

import {ScrollRow} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {SCROLL_ROW_SECTION_FRAGMENT} from '~/qroq/content-blocks/scrollRowSectionFragment';

import IconRenderer from '~/lib/renderers/iconRenderer';
import { sanitizeInput } from '~/lib/utilities/sanitizeInput';

import {Section} from '../layout/Section';

export type ScrollRowSectionProps = TypeFromSelection<
  typeof SCROLL_ROW_SECTION_FRAGMENT
>;

export function ScrollRowSection(
  props: {data: ScrollRowSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  const items = data.items.map((item) => {
    return {
      children: <IconRenderer data={{name: item.icon}} />,
      text: item.text as string,
    };
  });

  return (
    <Section className='fsb' colorTheme={theme}>
      <ScrollRow darkMode={darkMode} scrollRowItems={items} />
    </Section>
  );
}
