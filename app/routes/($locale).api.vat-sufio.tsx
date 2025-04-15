import type { ActionFunctionArgs, LoaderFunctionArgs } from '@shopify/remix-oxygen';

// Add a loader function to handle GET requests
export async function loader({ request }: LoaderFunctionArgs) {
  // Return a 405 Method Not Allowed response for GET requests
  return new Response('Method Not Allowed. Please use POST.', { 
    headers: {
      'Allow': 'POST'
    },
    status: 405
  });
}

export async function action({ context, request }: ActionFunctionArgs) {
  try {
    const { vatErrorMessage, vatNumber } = (await request.json()) as {
      vatErrorMessage: string;
      vatFormatErrorMessage: string;
      vatNumber: string;
      vatRegionErrorMessage: string;
    };

    // Trim and remove any extraneous whitespace
    const trimmedVatInput = vatNumber.trim();

    let countryCode: string;
    let rawVatNumber: string;

    // Check if the input contains a space
    const parts = trimmedVatInput.split(/\s+/);
    if (parts.length >= 2) {
      // If there is a space, assume the first part is the country code
      // and the rest is the VAT number.
      countryCode = parts[0];
      rawVatNumber = parts.slice(1).join('');
    } else {
      // If there's no space, assume the first two characters are the country code
      // and the rest is the VAT number.
      if (trimmedVatInput.length < 3) {
        return new Response(
          JSON.stringify({
            message: vatErrorMessage || 'Invalid VAT format. Please check your input.',
            success: false,
          }),
          { status: 400 }
        );
      }
      countryCode = trimmedVatInput.substring(0, 2);
      rawVatNumber = trimmedVatInput.substring(2);
    }

    // Clean the VAT number: remove spaces, dots, or hyphens
    const cleanedVatNumber = rawVatNumber.replace(/[.\s-]/g, '');

    // Define the VIES API endpoint and payload
    const endpoint =
      'https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number';
    const payload = {
      countryCode,
      vatNumber: cleanedVatNumber,
    };

    // Call the VIES API
    const response = await fetch(endpoint, {
      body: JSON.stringify(payload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // Retrieve and parse the response
    const responseText = await response.text();
    let result: { valid: boolean };
    try {
      result = JSON.parse(responseText) as { valid: boolean };
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: vatErrorMessage || 'Invalid VAT Number',
          success: false,
        }),
        { status: 400 }
      );
    }

    // Check for API errors or an invalid VAT response
    if (!response.ok || !result.valid) {
      return new Response(
        JSON.stringify({
          message: vatErrorMessage || 'Invalid VAT Number',
          success: false,
        }),
        { status: 400 }
      );
    }

    // VAT is valid; update the cart attribute with the concatenated value.
    const vatValue = `${countryCode}${cleanedVatNumber}`;

    const { cart } = context;
    const newCart = await cart.get();
    const existingAttributes = newCart?.attributes || [];
    const newAttributes = [...existingAttributes];

    // Update the VAT attribute if it exists; otherwise, add it.
    const index = newAttributes.findIndex((attr) => attr.key === 'vat');
    if (index !== -1) {
      newAttributes[index].value = vatValue;
    } else {
      newAttributes.push({ key: 'vat', value: vatValue });
    }

    try {
      const cartResponse = await cart.updateAttributes(
        newAttributes.map((attr) => ({
          ...attr,
          value: attr.value ?? '',
        }))
      );
      return new Response(JSON.stringify(cartResponse), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (e) {
      console.error('Error updating cart attributes:', e);
      return new Response('Internal Server Error', { status: 500 });
    }
  } catch (error) {
    console.error('Error in VAT validation action:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}