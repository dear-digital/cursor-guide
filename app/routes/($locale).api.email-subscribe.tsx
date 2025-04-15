import type {ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({context, request}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {status: 405});
  }

  try {
    const {email_address, listId, status} = (await request.json()) as {
      email_address: string;
      listId: string;
      status: string;
    };

    const response = await fetch(
      `https://us9.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        body: JSON.stringify({email_address, status}),
        headers: {
          Authorization: `Bearer ${context.env.PRIVATE_MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      console.error('Error subscribing to Mailchimp:', response);

      throw new Error(`External API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return JSON.stringify(responseData);
  } catch (error) {
    console.error('Error in proxy action:', error);
    return new Response('Internal Server Error', {status: 500});
  }
}
