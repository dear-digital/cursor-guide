import type {ActionFunctionArgs} from '@shopify/remix-oxygen';
import type {
  CustomerCreateMutation,
  CustomerCreateMutationVariables,
  GetCustomerByEmailQuery,
  GetCustomerByEmailQueryVariables,
  MetaobjectUpsertMutation,
  MetaobjectUpsertMutationVariables,
  UpdateCustomerMetafieldsMutation,
  UpdateCustomerMetafieldsMutationVariables,
} from 'types/admin.generated';

import {json} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

import {
  CUSTOMER_CREATE,
  CUSTOMER_METAFIELD_UPDATE,
  CUSTOMER_QUERY,
  METAOBJECT_UPSERT,
} from '~/graphql/admin/queries';

// Mapping function for converting full country name to ISO country code
function mapCountryToCode(country: string): string {
  const countryMap: { [key: string]: string } = {
    belgien: 'BE',
    belgique: 'BE',
    belgium: 'BE',
    belgië: 'BE',
    luxembourg: 'LU',
    luxembourgish: 'LU',
    luxemburg: 'LU',
    luxemburgisch: 'LU',
    nederland: 'NL',
    netherlands: 'NL',
    niederlande: 'NL',
  };

  const lower = country.toLowerCase();
  const countryCode = countryMap[lower];

  if (!countryCode) {
    throw new Error(`Unsupported country: ${country}`);
  }

  return countryCode;
}

// VAT validation function with sanitation.
// (Unused in this file now because validation is assumed to occur on the frontend.)
function validateVAT(vat: string): boolean {
  const sanitizedVAT = vat.replace(/[\s-]/g, '');
  const vatRegex = /^[A-Za-z0-9]{8,12}$/;
  return vatRegex.test(sanitizedVAT);
}

export async function action(props: ActionFunctionArgs) {
  const {request} = props;
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);

  invariant(fields.first_name, 'First name is required');
  invariant(fields.email, 'Email is required');
  invariant(fields.phone_number, 'Phone number is required');
  invariant(fields.address, 'Address is required');
  invariant(fields.country, 'Country is required');
  invariant(fields.thermomix, 'Thermomix is required');

  // Removed extra VAT validation since it's handled in the frontend.

  const {error, form} = await createOrderFormEntry({
    ...props,
    fields,
  });

  if (error) {
    return json({error}, {status: 400});
  }

  return json({form});
}

async function createOrderFormEntry({
  context,
  fields,
}: { fields: { [k: string]: FormDataEntryValue } } & ActionFunctionArgs) {
  const countryStr = fields.country.toString();
  const countryCode =
    countryStr.length === 2 ? countryStr : mapCountryToCode(countryStr);

  const addressField =
    fields.street && fields.street.toString().trim() !== ''
      ? { key: 'streetname', value: fields.street }
      : { key: 'address', value: fields.address };

  // Use the VAT number (if provided) for the "company" field.
  // Default to an empty string if not provided.
  const companyValue =
    (fields.vat_number && fields.vat_number.toString().trim()) || '';

  const metaobjectHandle = {
    handle: 'pre-order',
    type: 'pre_order',
  };

  const metaobject = {
    capabilities: {
      publishable: {
        status: 'ACTIVE',
      },
    },
    fields: [
      { key: 'first_name', value: fields.first_name },
      { key: 'last_name', value: fields.last_name },
      { key: 'email', value: fields.email },
      { key: 'phone_number', value: fields.phone_number },
      addressField,
      { key: 'country', value: countryCode },
      { key: 'city', value: fields.city },
      { key: 'zipcode', value: fields.zip },
      { key: 'thermomix', value: fields.thermomix },
      { key: 'advisor', value: fields.advisor_id },
      { key: 'company', value: companyValue },
    ],
    handle: '',
  };

  const { metaobjectUpsert } = (await context.admin(METAOBJECT_UPSERT, {
    variables: {
      handle: metaobjectHandle,
      metaobject,
    } as MetaobjectUpsertMutationVariables,
  })) as MetaobjectUpsertMutation;

  if (!metaobjectUpsert || metaobjectUpsert.userErrors.length > 0) {
    const error = metaobjectUpsert?.userErrors[0];
    return { error, form: null };
  }

  const metaobjectId = metaobjectUpsert.metaobject?.id;
  let perOrderCustomer = null;
  const { customers } = (await context.admin(CUSTOMER_QUERY, {
    variables: {
      query: `email:${fields.email}`,
    } as GetCustomerByEmailQueryVariables,
  })) as GetCustomerByEmailQuery;

  if (!customers || customers?.edges.length === 0) {
    const { customerCreate } = (await context.admin(CUSTOMER_CREATE, {
      variables: {
        input: {
          email: fields.email,
          firstName: fields.first_name,
          lastName: fields.last_name,
          locale: context.locale.preferredLocale || 'nl',
          metafields: [
            {
              key: 'pre_order_forms',
              namespace: 'custom',
              type: 'list.metaobject_reference',
              value: JSON.stringify([metaobjectId]),
            },
          ],
        },
      } as CustomerCreateMutationVariables,
    })) as CustomerCreateMutation;

    perOrderCustomer = customerCreate?.customer;

    if (!customerCreate || customerCreate.userErrors.length > 0) {
      const error = customerCreate?.userErrors[0];
    }
  } else {
    perOrderCustomer = customers.edges[0].node;
    const customer = customers.edges[0].node;
    const existingMetafield = customer.metafield;
    let updatedMetafieldValue = [metaobjectId];

    if (existingMetafield) {
      const existingValue = JSON.parse(existingMetafield.value) as string[];
      updatedMetafieldValue = [...existingValue, metaobjectId];
    }

    const { customerUpdate } = (await context.admin(CUSTOMER_METAFIELD_UPDATE, {
      variables: {
        input: {
          id: customer.id,
          metafields: [
            {
              id: existingMetafield?.id,
              key: 'pre_order_forms',
              namespace: 'custom',
              type: 'list.metaobject_reference',
              value: JSON.stringify(updatedMetafieldValue),
            },
          ],
        },
      } as UpdateCustomerMetafieldsMutationVariables,
    })) as UpdateCustomerMetafieldsMutation;

    if (!customerUpdate || customerUpdate.userErrors.length === 0) {
      // Optionally handle update errors here.
    }
  }

  try {
    const mailchimpResponse = await fetch(
      `https://us9.api.mailchimp.com/3.0/lists/bf591489ee/members`,
      {
        body: JSON.stringify({
          email_address: fields.email,
          language: context.locale.preferredLocale || 'en',
          merge_fields: {
            ADDRESS: {
              addr1: fields.address || '',
              addr2: fields.address2 || '',
              city: fields.city || 'undefined',
              country: countryCode,
              state: fields.state || 'undefined',
              zip: fields.zip || 'undefined',
            },
            ADVISOR: fields.advisor_email || '',
            COUNTRY: countryCode,
            FNAME: fields.first_name || '',
            LNAME: fields.last_name || '',
            PHONE: fields.phone_number || '',
          },
          status: 'subscribed',
          tags: ['pre-order-TM7'],
        }),
        headers: {
          Authorization: `Bearer ${context.env.PRIVATE_MAILCHIMP_API_KEY!}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (!mailchimpResponse.ok) {
      const errorMessage = await mailchimpResponse.text();
      console.error('Error subscribing to Mailchimp:', errorMessage);
    } else {
      console.log('Mailchimp subscription successful');
    }
  } catch (error) {
    console.error(`Mailchimp API error: ${error}`);
  }

  return { error: null, form: metaobjectUpsert.metaobject };
}