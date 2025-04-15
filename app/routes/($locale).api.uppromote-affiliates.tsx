import type {ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({context, request}: ActionFunctionArgs) {
  try {
    const {query} = (await request.json()) as {
      query: string;
    };

    const url = new URL(
      'https://aff-api.uppromote.com/api/v1/affiliates/search',
    );

    const params: {[key: string]: string} = {
      q: query,
    };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );

    const headers = {
      Accept: 'application/json',
      // replace with your API key in ENV
      Authorization: `Bearer ${context.env.PRIVATE_UPPROMOTE_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      headers: headers,
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Error subscribing to uppromote:', JSON.stringify(response));

      throw new Error(`External API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return JSON.stringify(responseData);
  } catch (error) {
    console.error('Error in uppromote affiliates fetch:', JSON.stringify(error));
    return new Response('Internal Server Error', {status: 500});
  }
}
