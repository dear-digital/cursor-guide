import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

/**
 * Calculates the discount percentage between the original price and the actual price.
 *
 * @param price - The actual price of the item, containing the amount and currency code.
 * @param compareAtPrice - The original price of the item, containing the amount and currency code. This parameter is optional.
 * @returns The discount percentage as a string with a '%' symbol, or null if the compareAtPrice is not provided or not greater than the actual price.
 */


export function calculateDiscountPercentage(
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>,
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >,
): null | string {
  // Ensure compareAtPrice is provided and greater than the actual price
  if (
    !compareAtPrice ||
    !compareAtPrice.amount ||
    parseFloat(compareAtPrice.amount) <= parseFloat(price.amount)
  ) {
    return null;
  }

  // Calculate the discount percentage
  const actualPrice = parseFloat(price.amount);
  const originalPrice = parseFloat(compareAtPrice.amount);
  const discountPercentage =
    ((originalPrice - actualPrice) / originalPrice) * 100;

  // Return the ceiling value of the percentage
return Math.ceil(discountPercentage).toString() + '%';
}
