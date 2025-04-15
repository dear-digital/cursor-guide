import type {TypeFromSelection} from 'groqd';

import imageUrlBuilder from '@sanity/image-url';

import type {MULTI_COLUMN_SECTION_FRAGMENT} from '~/qroq/content-blocks/multiColumnSectionFragment';

import { Section } from '~/components/layout/Section';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import IconRenderer from '~/lib/renderers/iconRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';
import { useRootLoaderData } from '~/root';

export type MultiColumnGridProps = {
  data: TypeFromSelection<
    typeof MULTI_COLUMN_SECTION_FRAGMENT
  >['multiColumnCards'];
};

export function MultiColumnGrid({data}: MultiColumnGridProps) {
  // Determine grid columns based on number of items
  const gridColsClass = data.length === 3 ? 'grid-cols-3' : 'grid-cols-4';
  const { env } = useRootLoaderData();
  
  // Function to get direct image URL for small images
  const getDirectImageUrl = (imageRef: string) => {
    if (!env) return '';
    
    const urlBuilder = imageUrlBuilder({
      dataset: env.SANITY_STUDIO_DATASET,
      projectId: env.SANITY_STUDIO_PROJECT_ID,
    });
    
    return urlBuilder.image({ _ref: imageRef }).url();
  };
  
  return (
    <Section>
      <div className={`container mx-auto grid ${gridColsClass} gap-6`}>
        {data.map((card, index) => (
          <div key={index}>
            {card.image && card.smallImage && card.image.sm?.image?.asset?._ref ? (
              <div className="pb-8 flex justify-center">
                <img 
                  alt={card.image.sm.image.altText || ''} 
                  className="max-w-[80px]"
                  src={getDirectImageUrl(card.image.sm.image.asset._ref)} 
                />
              </div>
            ) : (
              card.image && <ImageRenderer className={`pb-8 ${card.smallImage ? 'max-w-[100px] mx-auto' : ''}`} data={{image: card.image}} />
            )}
            {card.icon && <div className="flex justify-center pb-6"><div className={`${card.smallImage ? 'w-12 h-12' : 'w-24 h-24'}`}><IconRenderer data={{name: card.icon}} /></div></div>}
            <div className="space-y-4 text-center">
              <div className="text-2xl leading-relaxed">{card.title}</div>
              <div className="leading-12">{card.text}</div>
              {card.link && <ButtonRenderer data={{link: card.link}} />}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
