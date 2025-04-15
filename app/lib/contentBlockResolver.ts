import { BentoBoxSection } from '~/components/content-blocks/BentoBoxSection';
import { BentoCarouselSection } from '~/components/content-blocks/BentoCarouselSection';
import { CarouselSection } from '~/components/content-blocks/CarouselSection';
import { CollectionBannerSection } from '~/components/content-blocks/CollectionBannerSection';
import { CollectionProductGridSection } from '~/components/content-blocks/CollectionProductGridSection';
import { ContentBlockSection } from '~/components/content-blocks/ContentBlockSection';
import { DropdownSection } from '~/components/content-blocks/DropdownSection';
import { FeaturedCollections } from '~/components/content-blocks/FeaturedCollections';
import { FeaturedProductSection } from '~/components/content-blocks/FeaturedProductSection';
import { FeaturedProductsSection } from '~/components/content-blocks/FeaturedProductsSection';
import { FunctionsTabSection } from '~/components/content-blocks/FunctionsTabSection';
import { HeadlineSection } from '~/components/content-blocks/HeadlineSection';
import { ImageCarouselSection } from '~/components/content-blocks/ImageCarouselSection';
import { ImageSection } from '~/components/content-blocks/ImageSection';
import { ImageTextOverlayCardCarousel } from '~/components/content-blocks/ImageTextOverlayCardCarouselSection';
import { ImageTextOverlayCarouselSection } from '~/components/content-blocks/ImageTextOverlayCarouselSection';
import { ImageTextOverlaySection } from '~/components/content-blocks/ImageTextOverlaySection';
import { MediaContainerSection } from '~/components/content-blocks/MediaContainerSection';
import { ProductBlockSection } from '~/components/content-blocks/ProductBlockSection';
import { ProductInformationSection } from '~/components/content-blocks/ProductInformationSection';
import { RelatedProductsSection } from '~/components/content-blocks/RelatedProductsSection';
import { RichtextSection } from '~/components/content-blocks/RichtextSection';
import { TextImageSection } from '~/components/content-blocks/TextImageSection';
import { TextSection } from '~/components/content-blocks/TextSection';
import { FooterSocialLinksOnly } from '~/components/footers/FooterSocialLinksOnly';


export const contentBlockResolver: {
  [key: string]: React.FC<any>;
} = {
  bentoBoxSection: BentoBoxSection,
  bentoCarouselSection: BentoCarouselSection,
  carouselSection: CarouselSection,
  collectionBannerSection: CollectionBannerSection,
  collectionProductGridSection: CollectionProductGridSection,
  contentBlockSection: ContentBlockSection,
  dropdownSection: DropdownSection,
  featuredCollections: FeaturedCollections,
  featuredProductSection: FeaturedProductSection,
  featuredProductsSection: FeaturedProductsSection,
  functionsTabSection: FunctionsTabSection,
  headlineSection: HeadlineSection,
  imageCarouselSection: ImageCarouselSection,
  imageSection: ImageSection,
  imageTextOverlayCardCarouselSection: ImageTextOverlayCardCarousel,
  imageTextOverlayCarouselSection: ImageTextOverlayCarouselSection,
  imageTextOverlaySection: ImageTextOverlaySection,
  mediaContainerSection: MediaContainerSection,
  productBlockSection: ProductBlockSection,
  productInformationSection: ProductInformationSection,
  relatedProductsSection: RelatedProductsSection,
  richtextSection: RichtextSection,
  socialLinksOnly: FooterSocialLinksOnly,
  textImageSection: TextImageSection,
  textSection: TextSection,
};
