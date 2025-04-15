import { BentoBoxSection } from '~/components/content-blocks/BentoBoxSection';
import { BentoCarouselSection } from '~/components/content-blocks/BentoCarouselSection';
import { CarouselSection } from '~/components/content-blocks/CarouselSection';
import { CollectionBannerSection } from '~/components/content-blocks/CollectionBannerSection';
import { CollectionProductGridSection } from '~/components/content-blocks/CollectionProductGridSection';
import { ContentBlockSection } from '~/components/content-blocks/ContentBlockSection';
import { DownloadSection } from '~/components/content-blocks/DownloadsSection';
import { DropdownSection } from '~/components/content-blocks/DropdownSection';
import { FaqSection } from '~/components/content-blocks/FaqSection';
import { FeaturedCollections } from '~/components/content-blocks/FeaturedCollections';
import { FeaturedProductSection } from '~/components/content-blocks/FeaturedProductSection';
import { FeaturedProductsSection } from '~/components/content-blocks/FeaturedProductsSection';
import { FullWidthImageSection } from '~/components/content-blocks/FullWidthImageSection';
import { FunctionsTabSection } from '~/components/content-blocks/FunctionsTabSection';
import { GalleryCarouselSection } from '~/components/content-blocks/GalleryCarouselSection';
import { HeadlineSection } from '~/components/content-blocks/HeadlineSection';
import { ImageCarouselSection } from '~/components/content-blocks/ImageCarouselSection';
import { ImageSection } from '~/components/content-blocks/ImageSection';
import { ImageTextCarouselSection } from '~/components/content-blocks/ImageTextCarouselSection';
import { ImageTextOverlayCardCarousel } from '~/components/content-blocks/ImageTextOverlayCardCarouselSection';
import { ImageTextOverlayCarouselSection } from '~/components/content-blocks/ImageTextOverlayCarouselSection';
import { ImageTextOverlaySection } from '~/components/content-blocks/ImageTextOverlaySection';
import { MediaContainerCarouselSection } from '~/components/content-blocks/MediaContainerCarouselSection';
import { MediaContainerSection } from '~/components/content-blocks/MediaContainerSection';
import { MultiColumnSection } from '~/components/content-blocks/multiColumnSection';
import {OrderFormSection} from '~/components/content-blocks/OrderFormSection';
import { ProductBlockSection } from '~/components/content-blocks/ProductBlockSection';
import { ProductInformationSection } from '~/components/content-blocks/ProductInformationSection';
import { RelatedProductsSection } from '~/components/content-blocks/RelatedProductsSection';
import { RichtextSection } from '~/components/content-blocks/RichtextSection';
import { ScrollRowSection } from '~/components/content-blocks/ScrollRowSection';
import { SectionNavigatorSection } from '~/components/content-blocks/SectionNavigatorSection';
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
  downloadsSection: DownloadSection,
  dropdownSection: DropdownSection,
  faqSection: FaqSection,
  featuredCollections: FeaturedCollections,
  featuredProductSection: FeaturedProductSection,
  featuredProductsSection: FeaturedProductsSection,
  fullWidthImageSection: FullWidthImageSection,
  functionsTabSection: FunctionsTabSection,
  galleryCarouselSection: GalleryCarouselSection,
  headlineSection: HeadlineSection,
  imageCarouselSection: ImageCarouselSection,
  imageSection: ImageSection,
  imageTextCarouselSection: ImageTextCarouselSection,
  imageTextOverlayCardCarouselSection: ImageTextOverlayCardCarousel,
  imageTextOverlayCarouselSection: ImageTextOverlayCarouselSection,
  imageTextOverlaySection: ImageTextOverlaySection,
  mediaContainerCarouselSection: MediaContainerCarouselSection,
  mediaContainerSection: MediaContainerSection  ,
  multiColumnSection: MultiColumnSection,
  orderFormSection: OrderFormSection,
  productBlockSection: ProductBlockSection,
  productInformationSection: ProductInformationSection,
  relatedProductsSection: RelatedProductsSection,
  richtextSection: RichtextSection,
  scrollRowSection: ScrollRowSection,
  sectionNavigatorSection: SectionNavigatorSection,
  socialLinksOnly: FooterSocialLinksOnly,
  textImageSection: TextImageSection,
  textSection: TextSection,
};
