import type {TypeFromSelection} from 'groqd';

import {Headline} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {MULTI_COLUMN_SECTION_FRAGMENT} from '~/qroq/content-blocks/multiColumnSectionFragment';

import {useDevice} from '~/hooks/useDevice';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';

import {Section} from '../layout/Section';
import {MultiColumnGrid} from '../ui/cards/MultiColumnGrid';
import {MultiColumnSwiper} from '../ui/cards/MultiColumnSwiper';

export type MultiColumnSectionProps = TypeFromSelection<
  typeof MULTI_COLUMN_SECTION_FRAGMENT
>;

export function MultiColumnSection(
  props: {data: MultiColumnSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  const deviceType = useDevice();
  const isMobile = deviceType === 'mobile';

  return (
    <Section>
      <div>
        {data.headline?.headline && (
          <div className="py-8 text-center">
            <Headline
              children={
                <TitleRenderer data={{title: data.headline.headline}} />
              }
              eyebrowLine={data.headline.eyebrowline as string}
              spaceBelow={data.headline.spaceBelow}
              strongColor={data.headline.strongColor}
              subline={
                <TextRenderer
                  className="subline-text leading-12 lg:text-sm"
                  data={{text: data.headline.subline}}
                />
              }
            />
          </div>
        )}
        {isMobile ? (
          <MultiColumnSwiper data={data.multiColumnCards} />
        ) : (
          <MultiColumnGrid data={data.multiColumnCards} />
        )}
      </div>
    </Section>
  );
}
