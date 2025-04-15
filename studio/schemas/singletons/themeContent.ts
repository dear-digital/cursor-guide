import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'themeContent',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'account' },
    { name: 'cart' },
    { name: 'collection' },
    { name: 'error' },
    { name: 'general' },
    { name: 'product' },
    { name: 'stickyProductBar' },
    { name: 'forms' },
  ],
  fields: [
    defineField({
      title: 'Account',
      name: 'account',
      type: 'object',
      group: 'account',
      fields: [
        defineField({
          name: 'welcome',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'welcomeToYourAccount',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'accountDetails',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'signOut',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderHistory',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'noOrdersMessage',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'startShopping',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderDetail',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'returnToAccount',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderNumber',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'placedOn',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'product',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'price',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'quantity',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'total',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'subtotal',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'discounts',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'discountsOff',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'tax',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'shippingAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'noShippingAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'status',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'updateYourProfile',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'firstName',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'lastName',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'company',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addressLine1',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addressLine2',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'city',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'stateProvince',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'postalCode',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'country',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'phone',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'defaultAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'saving',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'save',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'cancel',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addName',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'editAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addressBook',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'noAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'default',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'edit',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'remove',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'profile',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'name',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'phoneNumber',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'emailAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderId',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderDate',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'fulfillmentStatus',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'viewDetails',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusCancelled',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusFailure',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusOpen',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusPending',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderStatusSuccess',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
    defineField({
      title: 'Cart',
      name: 'cart',
      type: 'object',
      group: 'cart',
      fields: [
        defineField({
          name: 'title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'proceedToCheckout',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'orderSummary',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'subtotal',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'discounts',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'applyDiscount',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'discountCode',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'remove',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'quantity',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'continueShopping',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'emptyMessage',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATNumberValidation',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATNumberValidationSuccess',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATNumberValidationFormatError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATNumberValidationError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATNumberRegionError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'VATInputLabel',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'NoAdvisorText',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'AdvisorSuccessMessage',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'AdvisorErrorMessage',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'AdvisorInputPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'AdvisorInputLabel',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
    defineField({
      name: 'collection',
      type: 'object',
      group: 'collection',
      fields: [
        defineField({
          title: 'Sort by',
          name: 'sortBy',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sort by - Featured',
          name: 'sortFeatured',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sort by - Price Low to High',
          name: 'sortLowHigh',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sort by - Price High to Low',
          name: 'sortHighLow',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sort by - Best selling',
          name: 'sortBestSelling',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sort by - Newest',
          name: 'sortNewest',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'filterAndSort',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'from',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'to',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'filterInStock',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'filterOutOfStock',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'viewAll',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'clearFilters',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'clear',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'apply',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'loading',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'loadPrevious',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'loadMoreProducts',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'noProductFound',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'noCollectionFound',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
    defineField({
      name: 'product',
      type: 'object',
      group: 'product',
      fields: [
        defineField({
          title: 'Add to cart',
          name: 'addToCart',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'sale',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Sold out',
          name: 'soldOut',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Quantity Selector Label',
          name: 'quantitySelector',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'VAT & Shipping Text',
          name: 'vatAndShippingText',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Specifications',
          name: 'specifications',
          type: 'object',
          fields: [
            defineField({
              name: 'specifications',
              title: 'Specifications Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'modes',
              title: 'Modes Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'product_description',
              title: 'Description Title',
              type: 'internationalizedArrayString',
            }),
          ],
        }),
        defineField({
          title: 'Product USPs',
          name: 'USPS',
          type: 'array',
          of: [
            defineField({
              name: 'USP',
              title: 'USP',
              type: 'object',
              fields: [
                defineField({
                  name: 'productUsp',
                  title: 'Product USP`s Title',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'productUspLogo',
                  type: 'string',
                  initialValue: 'Delivery',
                  options: {
                    list: [
                      { title: 'Delivery Truck', value: 'Delivery' },
                      { title: 'Calendar', value: 'Calendar' },
                      { title: 'Circle checkmark', value: 'CheckmarkCircle' },
                    ],
                    layout: 'dropdown',
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({
          title: 'Related products title',
          name: 'relatedProductsTitle',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Related products button text',
          name: 'relatedProductsButtonText',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
    defineField({
      name: 'error',
      type: 'object',
      group: 'error',
      fields: [
        defineField({
          title: 'Page not found',
          name: 'pageNotFound',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Server error',
          name: 'serverError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'Section error',
          name: 'sectionError',
          type: 'internationalizedArrayString',
        }),
        defineField({
          title: 'reloadPage',
          name: 'reloadPage',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'missingAddressId',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addressCreation',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
    defineField({
      name: 'forms',
      type: 'object',
      title: 'Form fields',
      group: ['forms'],
      fields: [
        defineField({
          name: 'firstName',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'firstNamePlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'lastName',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'lastNamePlaceholder',
          type: 'internationalizedArrayString',
        }),

        defineField({
          name: 'phoneNumber',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'phoneNumberPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'emailAddress',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'emailAddressPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'address',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'addressPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'formAddressInfo',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'advisor',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'advisorPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'country',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'countryPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'company',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'companyPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'loadingLabel',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'submitButtonLabel',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'vatValidateSubmit',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'thermomix',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'thermomixPlaceholder',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'advisorRequired',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Theme Content' }),
  },
});
