type AdminResponse = any | null;

type AdminAPIResponse = {
  data: null | object;
  errors: Error[] | null;
};

export type AdminClient = (
  query: null | string,
  options: {variables: null | object},
) => Promise<AdminResponse>;

/**
 * A basic Admin API fetch-based client.
 */
export function createAdminClient({
  adminApiVersion,
  privateAdminToken,
  storeDomain,
}: {
  adminApiVersion: string;
  privateAdminToken: string;
  storeDomain: string;
}) {
  const admin: AdminClient = async function (
    query: null | string,
    {
      variables = {},
    }: {
      variables: null | object;
    },
  ): Promise<AdminResponse> {
    if (!query) {
      throw new Error('Must provide a `query` to the admin client');
    }

    const endpoint = `${storeDomain}/admin/api/${adminApiVersion}/graphql.json`;
    const options = {
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': privateAdminToken,
      },
      method: 'POST',
    };

    const request = await fetch(endpoint, options);

    if (!request.ok) {
      throw new Error(
        `graphql api request not ok ${request.status} ${request.statusText}`,
      );
    }

    const response = (await request.json()) as AdminAPIResponse;

    if (response?.errors?.length) {
      throw new Error(response.errors[0].message);
    }

    return response.data;
  };

  return {admin};
}
