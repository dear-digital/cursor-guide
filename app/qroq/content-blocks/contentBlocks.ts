import { BENTO_BOX_SECTION_FRAGMENT } from './bentoBoxSectionFragment';
import { BENTO_CAROUSEL_SECTION_FRAGMENT } from './bentoCarouselSectionFragment';
import { CONTENT_BLOCK_SECTION_FRAGMENT } from './contentBlockFragment';
import { DOWNLOADS_SECTION_FRAGMENT } from './downloadsSectionFragment';
import { DROPDOWN_SECTION_FRAGMENT } from './dropdownSectionFragment';
import { FAQ_SECTION_FRAGMENT } from './faqSectionFragment';
import { FEATURED_CARDS_SECTION_FRAGMENT } from './featuredCardsSectionFragment';
import { FEATURED_COLLECTIONS_FRAGMENT } from './featuredCollectionsFragment';
import { FEATURED_PRODUCT_SECTION_FRAGMENT } from './featuredProductFragment';
import { FEATURED_PRODUCTS_SECTION_FRAGMENT } from './featuredProductsSectionFragment';
import { FULL_WIDTH_IMAGE_SECTION_FRAGMENT } from './fullWidthImageSectionFragment';
import { FUNCTIONS_TAB_SECTION_FRAGMENT } from './functionsTabSectionFragment';
import { GALLERY_CAROUSEL_SECTION_FRAGMENT } from './galleryCarouselFragment';
import { HEADLINE_SECTION_FRAGMENT } from './headlineSectionFragment';
import { IMAGE_CAROUSEL_SECTION_FRAGMENT } from './imageCarouselFragment';
import { IMAGE_SECTION_FRAGMENT } from './imageSectionFragment';
import { IMAGE_TEXT_CAROUSEL_SECTION_FRAGMENT } from './imageTextCarouselSection';
import { IMAGE_TEXT_OVERLAY_CARD_CAROUSEL_FRAGMENT } from './imageTextOverlayCardCarouselSectionFragment';
import { IMAGE_TEXT_OVERLAY_CAROUSEL_SECTION_FRAGMENT } from './imageTextOverlayCarouselSectionFragment';
import { IMAGE_TEXT_OVERLAY_SECTION_FRAGMENT } from './imageTextOverlaySectionFragment';
import { MEDIA_CONTAINER_CAROUSEL_SECTION_FRAGMENT } from './mediaContainerCarouselFragment';
import { MEDIA_CONTAINER_SECTION_FRAGMENT } from './mediaContainerSectionFragment';
import { MULTI_COLUMN_SECTION_FRAGMENT } from './multiColumnSectionFragment';
import {ORDER_FORM_SECTION_FRAGMENT} from './orderFormSectionFragment';
import { PRODUCT_BLOCK_SECTION_FRAGMENT } from './productBlockSectionFragment';
import { SCROLL_ROW_SECTION_FRAGMENT } from './scrollRowSectionFragment';
import { SECTION_NAVIGATOR_SECTION_FRAGMENT } from './sectionNavigatorSectionFragment';
import { TEXT_IMAGE_SECTION_FRAGMENT } from './textImageSectionFragment';
import { TEXT_SECTION_FRAGMENT } from './textSectionFragment';

export const CONTENT_BLOCKS_LIST_SELECTION = {
  "_type == 'bentoBoxSection'": BENTO_BOX_SECTION_FRAGMENT,
  "_type == 'bentoCarouselSection'": BENTO_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'contentBlockSection'": CONTENT_BLOCK_SECTION_FRAGMENT,
  "_type == 'downloadsSection'": DOWNLOADS_SECTION_FRAGMENT,
  "_type == 'dropdownSection'": DROPDOWN_SECTION_FRAGMENT,
  // "_type == 'carouselSection'": CAROUSEL_SECTION_FRAGMENT,
  "_type == 'faqSection'": FAQ_SECTION_FRAGMENT,
  "_type == 'featuredCardsSection'": FEATURED_CARDS_SECTION_FRAGMENT,
  "_type == 'featuredCollections'": FEATURED_COLLECTIONS_FRAGMENT,
  "_type == 'featuredProductSection'": FEATURED_PRODUCT_SECTION_FRAGMENT,
  "_type == 'featuredProductsSection'": FEATURED_PRODUCTS_SECTION_FRAGMENT,
  "_type == 'fullWidthImageSection'": FULL_WIDTH_IMAGE_SECTION_FRAGMENT,
  "_type == 'functionsTabSection'": FUNCTIONS_TAB_SECTION_FRAGMENT,
  "_type == 'galleryCarouselSection'": GALLERY_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'headlineSection'": HEADLINE_SECTION_FRAGMENT,
  "_type == 'imageCarouselSection'": IMAGE_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'imageSection'": IMAGE_SECTION_FRAGMENT,
  "_type == 'imageTextCarouselSection'": IMAGE_TEXT_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'imageTextOverlayCardCarouselSection'": IMAGE_TEXT_OVERLAY_CARD_CAROUSEL_FRAGMENT,
  "_type == 'imageTextOverlayCarouselSection'": IMAGE_TEXT_OVERLAY_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'imageTextOverlaySection'": IMAGE_TEXT_OVERLAY_SECTION_FRAGMENT,
  "_type == 'mediaContainerCarouselSection'": MEDIA_CONTAINER_CAROUSEL_SECTION_FRAGMENT,
  "_type == 'mediaContainerSection'": MEDIA_CONTAINER_SECTION_FRAGMENT,
  "_type == 'multiColumnSection'": MULTI_COLUMN_SECTION_FRAGMENT,
  "_type == 'orderFormSection'": ORDER_FORM_SECTION_FRAGMENT,
  "_type == 'productBlockSection'": PRODUCT_BLOCK_SECTION_FRAGMENT,
  "_type == 'scrollRowSection'": SCROLL_ROW_SECTION_FRAGMENT,
  "_type == 'sectionNavigatorSection'": SECTION_NAVIGATOR_SECTION_FRAGMENT,
  // "_type == 'imageBannerSection'": IMAGE_BANNER_SECTION_FRAGMENT,
  // "_type == 'richtextSection'": RICHTEXT_SECTION_FRAGMENT,
  "_type == 'textImageSection'": TEXT_IMAGE_SECTION_FRAGMENT,
  "_type == 'textSection'": TEXT_SECTION_FRAGMENT,
};
