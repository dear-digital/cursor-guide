/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type MetaobjectUpsertMutationVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.MetaobjectHandleInput;
  metaobject: StorefrontAPI.MetaobjectUpsertInput;
}>;

export type MetaobjectUpsertMutation = {
  metaobjectUpsert?: StorefrontAPI.Maybe<{
    metaobject?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'handle'>
    >;
    userErrors: Array<
      Pick<StorefrontAPI.MetaobjectUserError, 'field' | 'message'>
    >;
  }>;
};

export type GetCustomerByEmailQueryVariables = StorefrontAPI.Exact<{
  query: StorefrontAPI.Scalars['String']['input'];
}>;

export type GetCustomerByEmailQuery = {
  customers: {
    edges: Array<{
      node: Pick<StorefrontAPI.Customer, 'id'> & {
        metafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'id' | 'key' | 'value' | 'type'>
        >;
      };
    }>;
  };
};

export type CustomerCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerInput;
}>;

export type CustomerCreateMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.UserError, 'field' | 'message'>>;
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        | 'id'
        | 'email'
        | 'phone'
        | 'taxExempt'
        | 'firstName'
        | 'lastName'
        | 'locale'
      > & {
        amountSpent: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        smsMarketingConsent?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.CustomerSmsMarketingConsentState,
            'marketingState' | 'marketingOptInLevel' | 'consentUpdatedAt'
          >
        >;
        metafield?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'id' | 'value'>
        >;
      }
    >;
  }>;
};

export type UpdateCustomerMetafieldsMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerInput;
}>;

export type UpdateCustomerMetafieldsMutation = {
  customerUpdate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Customer, 'id'> & {
        metafields: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Metafield,
              'id' | 'namespace' | 'key' | 'value'
            >;
          }>;
        };
      }
    >;
    userErrors: Array<Pick<StorefrontAPI.UserError, 'message' | 'field'>>;
  }>;
};

export type DraftOrderCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.DraftOrderInput;
}>;

export type DraftOrderCreateMutation = {
  draftOrderCreate?: StorefrontAPI.Maybe<{
    draftOrder?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.DraftOrder, 'id' | 'name'>
    >;
    userErrors: Array<Pick<StorefrontAPI.UserError, 'message' | 'field'>>;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  query GetCustomerByEmail($query: String!) {\n    customers(first: 1, query: $query) {\n      edges {\n        node {\n          id\n          metafield(key: "pre_order_forms", namespace: "custom") {\n            id\n            key\n            value\n            type\n          }\n        }\n      }\n    }\n  }\n': {
    return: GetCustomerByEmailQuery;
    variables: GetCustomerByEmailQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n    mutation metaobjectUpsert($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {\n      metaobjectUpsert(handle: $handle, metaobject: $metaobject) {\n        metaobject {\n          id\n          handle\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n  ': {
    return: MetaobjectUpsertMutation;
    variables: MetaobjectUpsertMutationVariables;
  };
  '#graphql\n  mutation customerCreate($input: CustomerInput!) {\n    customerCreate(input: $input) {\n      userErrors {\n        field\n        message\n      }\n      customer {\n        id\n        email\n        phone\n        taxExempt\n        firstName\n        lastName\n        locale\n        amountSpent {\n          amount\n          currencyCode\n        }\n        smsMarketingConsent {\n          marketingState\n          marketingOptInLevel\n          consentUpdatedAt\n        }\n        metafield(namespace: "custom", key: "draft_orders") {\n          id\n          value\n        }\n      }\n    }\n  }\n': {
    return: CustomerCreateMutation;
    variables: CustomerCreateMutationVariables;
  };
  '#graphql\n  mutation updateCustomerMetafields($input: CustomerInput!) {\n    customerUpdate(input: $input) {\n      customer {\n        id\n        metafields(first: 1) {\n          edges {\n            node {\n              id\n              namespace\n              key\n              value\n            }\n          }\n        }\n      }\n      userErrors {\n        message\n        field\n      }\n    }\n  }\n': {
    return: UpdateCustomerMetafieldsMutation;
    variables: UpdateCustomerMetafieldsMutationVariables;
  };
  '#graphql\nmutation draftOrderCreate($input: DraftOrderInput!) {\n  draftOrderCreate(input: $input) {\n    draftOrder {\n      id\n      name\n    }\n    userErrors {\n      message\n      field\n    }\n  }\n}\n': {
    return: DraftOrderCreateMutation;
    variables: DraftOrderCreateMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
