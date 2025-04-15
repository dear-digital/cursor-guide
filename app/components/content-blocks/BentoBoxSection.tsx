import type {TypeFromSelection} from 'groqd';

import {BentoBoxTiles, Headline} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {BENTO_BOX_SECTION_FRAGMENT} from '~/qroq/content-blocks/bentoBoxSectionFragment';

import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import {Section} from '../layout/Section';

export type BentoBoxSectionProps = TypeFromSelection<
  typeof BENTO_BOX_SECTION_FRAGMENT
>;

export function BentoBoxSection(
  props: {data: BentoBoxSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  const tiles = data.tiles.map((tile) => {
    return {
      ...tile,
      heading: '100%',
      image: (tile.image as any).image?.asset?.asset._ref
        ? getImageUrl((tile.image as any)?.image?.asset?.asset?._ref, env)
        : '',
      text: tile.text as string,
      title: tile.title as string,
    };
  });

  return (
    <Section className={`text-theme-${theme}`} colorTheme={theme}>
      {data.headline?.headline && (
        <div className="py-8 text-center">
          <Headline
            children={<TitleRenderer data={{title: data.headline.headline}} />}
            eyebrowLine={data.headline.eyebrowline as string}
            spaceBelow={data.headline.spaceBelow}
            strongColor={data.headline.strongColor}
            subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.headline.subline}} />}
          />
        </div>
      )}
      <BentoBoxTiles darkMode={darkMode} tiles={tiles} />
    </Section>
  );
}
