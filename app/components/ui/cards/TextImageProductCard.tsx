import { EyeCatcher } from '@vorwerk/fibre-react';

import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';

export function TextImageProductCard({card}: {card: any}) {
  return (
    <div className="relative w-full space-y-8 bg-gray-background p-8">
      <div className="relative">
        <ImageRenderer data={{image: card.image}} />
        <div className="absolute right-0 top-0">
          {card.eyeCatcher && card.eyeCatcher.firstLine && (
            <EyeCatcher
              backgroundColor={card.eyeCatcher.backgroundColor || 'purple'}
              firstLine={card.eyeCatcher.firstLine || ''}
              rotation={card.eyeCatcher.rotation || 'none'}
              secondLine={card.eyeCatcher.secondLine || ''}
              size={card.eyeCatcher.size || 'small'}
              thirdLine={card.eyeCatcher.thirdLine || ''}
            />
          )}
        </div>
      </div>

      {card.title && (
        <h3 className="text-center text-4xl font-bold leading-8 text-contentPrimary lg:text-5xl lg:leading-12">
          {card.title}
        </h3>
      )}
      <div className="text-center">
        {card.link && <ButtonRenderer data={{link: card.link}} />}
      </div>
    </div>
  );
}
