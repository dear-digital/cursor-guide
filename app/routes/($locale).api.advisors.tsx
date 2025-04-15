import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {json} from '@shopify/remix-oxygen';

import {ADVISOR_QUERY} from '~/graphql/queries';

export async function loader(props: LoaderFunctionArgs) {
  const advisors = await fetchAllAdvisorMetaobjects(props);
  const filteredAdvisors = advisors.map((advisor) => ({
    advisorId: advisor.fields.find((field: any) => field.key === 'advisor_id')?.value,
    id: advisor.id,
    name: advisor.fields.find((field: any) => field.key === 'name')?.value,
  }));
  return json({data: filteredAdvisors});
}

async function fetchAllAdvisorMetaobjects({context}: LoaderFunctionArgs) {
  const allAdvisors: any[] = [];
  let pageCursor: null | string = null;
  const shopifyStore = context.env.PRIVATE_SHOPIFY_STORE;
  const accessToken = context.env.PRIVATE_SHOPIFY_ACCESS_TOKEN;

  if (!shopifyStore || !accessToken) {
    throw new Error('Missing Shopify environment variables');
  }

  do {
    const variables = {after: pageCursor, first: 250};
    const response: any = await fetch(
      `https://${shopifyStore}/admin/api/2025-01/graphql.json`,
      {
        body: JSON.stringify({query: ADVISOR_QUERY, variables}),
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching advisor metaobjects: ${response.statusText}`,
      );
    }

    const result = await response.json();
    if (!result.data) {
      throw new Error('Error fetching advisor metaobjects: no data returned');
    }

    const edges = result.data.metaobjects.edges;
    const advisors = edges.map((edge: any) => edge.node);
    allAdvisors.push(...advisors);

    pageCursor = result.data.metaobjects.pageInfo.hasNextPage
      ? result.data.metaobjects.pageInfo.endCursor
      : null;
  } while (pageCursor);

  return allAdvisors;
}
