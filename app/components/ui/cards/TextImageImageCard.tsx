import {Section} from '~/components/layout/Section';
import ButtonRenderer from '~/lib/renderers/buttonRenderer';
import ImageRenderer from '~/lib/renderers/imageRenderer';

export function TextImageImageCard({card}: {card: any}) {
  return (
    <Section>
      <div className={`relative h-full w-full bg-gray-background`}>
        <ImageRenderer
          className="h-full w-full object-cover"
          data={{image: card.image}}
        />
        <div className="absolute bottom-8 left-0 right-0 gap-8 bg-transparent text-center">
          {card.title && (
            <h3 className="pb-8 text-center text-4xl font-bold leading-8 text-white lg:text-5xl lg:leading-12">
              {card.title}
            </h3>
          )}
          {card.link && <ButtonRenderer data={{link: card.link}} />}
        </div>
      </div>
    </Section>
  );
}
