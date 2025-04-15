import type {TypeFromSelection} from 'groqd';

import {GalleryCarousel} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {GALLERY_CAROUSEL_SECTION_FRAGMENT} from '~/qroq/content-blocks/galleryCarouselFragment';

import {getImageUrl} from '~/lib/utilities/getImageUrl';
import { sanitizeInput } from '~/lib/utilities/sanitizeInput';
import {useRootLoaderData} from '~/root';

import { Section } from '../layout/Section';

export type GalleryCarouselSectionProps = TypeFromSelection<
  typeof GALLERY_CAROUSEL_SECTION_FRAGMENT
>;

export function GalleryCarouselSection(
  props: {data: GalleryCarouselSectionProps} & SectionDefaultProps,
) {
  const {env} = useRootLoaderData();
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const darkMode = theme === 'dark';

  if (!data.desktopSlides || !Array.isArray(data.desktopSlides)) {
    // Early return if desktopSlides is not valid
    return null;
  }

  const desktopSlides = data.desktopSlides
    .map((slide) => {
      if (!slide.slides) return null;

      return {
        bigImagePosLeft: slide.bigImagePosLeft,
        images: (slide.slides as any).map((image: any) => ({
          url: getImageUrl(image.image.asset.asset._ref, env),
        })),
      };
    })
    .filter(Boolean); // Remove null values from the mapped array

  // Check again if the mapped desktopSlides is empty after processing
  if (desktopSlides?.length === 0) {
    return null;
  }

  return (
    <Section className='lg:py-24' colorTheme={theme}>
      <GalleryCarousel darkMode={darkMode} desktopSlides={desktopSlides} />
    </Section>
  );
}
