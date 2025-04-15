// ADMIN API QUERIES
export const METAOBJECT_UPSERT = `#graphql
    mutation metaobjectUpsert($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
      metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  ` as const;

export const CUSTOMER_QUERY = `#graphql
  query GetCustomerByEmail($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          metafield(key: "pre_order_forms", namespace: "custom") {
            id
            key
            value
            type
          }
        }
      }
    }
  }
` as const;

export const CUSTOMER_CREATE = `#graphql
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        phone
        taxExempt
        firstName
        lastName
        locale
        amountSpent {
          amount
          currencyCode
        }
        smsMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
        metafield(namespace: "custom", key: "draft_orders") {
          id
          value
        }
      }
    }
  }
` as const;

export const CUSTOMER_METAFIELD_UPDATE = `#graphql
  mutation updateCustomerMetafields($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        metafields(first: 1) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
` as const;

export const CREATE_DRAFT_ORDER = `#graphql
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder {
      id
      name
    }
    userErrors {
      message
      field
    }
  }
}
` as const;
