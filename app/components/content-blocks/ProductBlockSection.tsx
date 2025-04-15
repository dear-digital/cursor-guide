import type {TypeFromSelection} from 'groqd';

import {Headline, ProductBlock} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {PRODUCT_BLOCK_SECTION_FRAGMENT} from '~/qroq/content-blocks/productBlockSectionFragment';

import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {sanitizeInput} from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import {Section} from '../layout/Section';

type ProductBlockSectionProps = TypeFromSelection<
  typeof PRODUCT_BLOCK_SECTION_FRAGMENT
>;

export function ProductBlockSection(
  props: {data: ProductBlockSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const {env} = useRootLoaderData();
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  return (
    <Section className={`lg:py-24 text-theme-${theme}`} colorTheme={theme}>
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
      {data.image && (
        <ProductBlock
          button={
            <div className='mt-4'>
              <ButtonRenderer data={{link: data?.linkBlock}} />
            </div>
          }
          darkMode={darkMode}
          headline={data.title as string}
          image={data.image?.sm?.image?._ref ? getImageUrl(data.image.sm.image._ref, env) : ''}
          imageAlt={'Product image'}
          price={data.subtitle as string}
        />
      )}
    </Section>
  );
}
