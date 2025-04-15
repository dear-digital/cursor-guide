import blogPost from './documents/blogPost';
import collection from './documents/collection';
import collectionTemplate from './documents/collectionTemplate';
import color from './documents/color';
import page from './documents/page';
import product from './documents/product';
import productTemplate from './documents/productTemplate';
import productVariant from './documents/productVariant';
import { imageResponsiveBlock } from './objects/blocks/imageResponsiveBlock';
import linkUrlBlock from './objects/blocks/link';
import maxWidthBaseBlock from './objects/blocks/maxWidthBaseBlock';
import internalLinkPartial from './objects/blocks/partials/internalLinkPartial';
import ratioPartial from './objects/blocks/partials/ratioPartial';
import videoPartial from './objects/blocks/partials/videoPartial';
import { sectionSettingsBlock } from './objects/blocks/sectionSettingsBlock';
import { textBlock } from './objects/blocks/textBaseBlock';
import { titleBlock } from './objects/blocks/titleBlock';
import bentoBoxSection from './objects/content-blocks/bentoBoxSection';
import sectionsList, {
  collectionSections,
  productSections,
} from './objects/content-blocks/contentBlockList';
import contentBlockSection from './objects/content-blocks/contentBlockSection';
import featuredCardsSection from './objects/content-blocks/featuredCardsSection';
import functionsTabSection from './objects/content-blocks/functionsTabSection';
import imageCarouselSection from './objects/content-blocks/imageCarouselSection';
import mediaContainerSection from './objects/content-blocks/mediaContainerSection';
import productBlockSection from './objects/content-blocks/productBlockSection';
import productInformationSection from './objects/content-blocks/productInformationSection';
import richtextSection from './objects/content-blocks/richtextSection';
import textImageSection from './objects/content-blocks/textImageSection';
import textSection from './objects/content-blocks/textSection';
import collectionBanner from './objects/content-blocks/collectionBanner';
import collectionProductGrid from './objects/content-blocks/collectionProductGrid';
import socialLinksOnly from './objects/footers/socialLinksOnly';
import aspectRatios from './objects/global/aspectRatios';
import contentPosition from './objects/global/contentPosition';
import footersList from './objects/global/footersList';
import headerNavigation from './objects/global/headerNavigation';
import paddingObject from './objects/global/padding';
import productRichtext from './objects/global/productRichtext';
import richtext from './objects/global/richtext';
import richTitle from './objects/global/richTitle';
import sectionSettings from './objects/global/sectionSettings';
import textPosition from './objects/global/textPosition';
import hero from './objects/hero-blocks/hero';
import heroBlocksList from './objects/hero-blocks/heroBlocksList';
import imageTextOverlay from './objects/hero-blocks/imageTextOverlayHero';
import { addressObject } from './objects/objects/addressObject';
import { contactObject } from './objects/objects/contactObject';
import { imageTextOverlayCardObject } from './objects/objects/imageTextOverlayCardObject';
import { openingHoursObject } from './objects/objects/openingHoursObject';
import { textImageCardObject } from './objects/objects/textImageCard';
import inventory from './objects/shopify/inventory';
import options from './objects/shopify/options';
import placeholderString from './objects/shopify/placeholderString';
import priceRange from './objects/shopify/priceRange';
import proxyString from './objects/shopify/proxyString';
import shopifyCollection from './objects/shopify/shopifyCollection';
import shopifyCollectionRule from './objects/shopify/shopifyCollectionRule';
import shopifyProduct from './objects/shopify/shopifyProduct';
import shopifyProductVariant from './objects/shopify/shopifyProductVariant';
import footer from './singletons/footer';
import header from './singletons/header';
import home from './singletons/home';
import settings from './singletons/settings';
import themeContent from './singletons/themeContent';
import relatedProductsSection from './objects/content-blocks/relatedProductsSection';
import { stickyProductBar } from './objects/blocks/stickyProductBar';
import bentoCarouselSection from './objects/content-blocks/bentoCarouselSection';
import { mediaContainerBlock } from './objects/blocks/mediaContainerBlock';
import { videoResponsiveLocalizedBlock } from './objects/blocks/videoLocalizedBlock';
import { imageResponsiveLocalizedBlock } from './objects/blocks/imageLocalizedBlock';
import dropdownSection from './objects/content-blocks/dropdownSection';

const singletons = [home, header, footer, settings, themeContent];
const documents = [
  page,
  color,
  collection,
  product,
  productTemplate,
  collectionTemplate,
  blogPost,
  productVariant,
];
const contentBlocks = [
  dropdownSection,
  featuredCardsSection,
  mediaContainerSection,
  bentoBoxSection,
  bentoCarouselSection,
  contentBlockSection,
  productInformationSection,
  relatedProductsSection,
  richtextSection,
  textImageSection,
  imageCarouselSection,
  textSection,
  productBlockSection,
];
const heroBlocks = [imageTextOverlay, hero];
const footers = [socialLinksOnly];
const blocks = [
  imageResponsiveBlock(),
  linkUrlBlock,
  maxWidthBaseBlock,
  videoResponsiveLocalizedBlock(),
  imageResponsiveLocalizedBlock(),
  stickyProductBar(),
  mediaContainerBlock(),
  textBlock(),
  titleBlock(),
  sectionSettingsBlock(),
];
const partials = [internalLinkPartial, ratioPartial, videoPartial];
const objects = [
  sectionsList,
  heroBlocksList,
  footersList,
  productSections,
  headerNavigation,
  collectionBanner,
  richTitle,
  collectionSections,
  collectionProductGrid,
  productRichtext,
  sectionSettings,
  inventory,
  options,
  placeholderString,
  priceRange,
  proxyString,
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,
  shopifyCollectionRule,
  paddingObject,
  contentPosition,
  textPosition,
  richtext,
  aspectRatios,

  imageTextOverlayCardObject(),
  contactObject(),
  addressObject(),
  openingHoursObject(),
  textImageCardObject(),
];

export const schemaTypes = [
  ...heroBlocks,
  ...partials,
  ...blocks,
  ...objects,
  ...contentBlocks,
  ...footers,
  ...singletons,
  ...documents,
];
