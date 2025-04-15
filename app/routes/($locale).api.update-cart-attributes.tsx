import type {ActionFunctionArgs} from '@shopify/remix-oxygen';

import type { Advisor } from '~/components/cart/HandleCartAttributeUpdate';

import {formatCartAttributes} from '~/lib/utilities/formatCartAttributes'; // Import helper function

export async function action({context, request}: ActionFunctionArgs) {

  try {
    const {cartAttributesWhichNeedsToUpdate, selectedAdvisor} =
      (await request.json()) as {
        cartAttributesWhichNeedsToUpdate: {
          key: string;
          value: Advisor[] | string;
        }[];
        selectedAdvisor: Advisor[];
      };

    if (!selectedAdvisor || selectedAdvisor.length === 0) {
      return new Response(
        JSON.stringify({message: 'No advisor found', success: false}),
        {headers: {'Content-Type': 'application/json'}, status: 400},
      );
    }

    // Retrieve existing cart attributes
    const {cart} = context;
    const newCart = await cart.get();

    const existingAttributes = newCart?.attributes || [];

    // Format the new attributes (only advisor and advisor_id)
    const formattedAttributes = formatCartAttributes(
      cartAttributesWhichNeedsToUpdate,
    );

    // Merge existing attributes with formatted ones, preserving others
    const mergedAttributes = [
      ...existingAttributes.filter(
        (attr) => attr.key !== 'advisor' && attr.key !== 'advisor_id',
      ), // Keep non-advisor attributes
      ...formattedAttributes, // Add/Update advisor attributes
    ];

    console.log('mergedAttributes', mergedAttributes);

    // Update cart attributes
    const response = await cart.updateAttributes(
      mergedAttributes.map((attr) => ({
        ...attr,
        value: attr.value ?? '',
      })),
    );

    // Update cart lines - Only include "advisor"
    const linesToUpdate = newCart?.lines?.nodes.map((line) => ({
      attributes: mergedAttributes
        .filter((attr) => attr.key === 'advisor')
        .map((attr) => ({key: attr.key, value: attr.value || ''})), // Ensure value is a string
      id: line.id,
    }));

    if (linesToUpdate?.length) {
      await cart.updateLines(linesToUpdate);
    }

    return new Response(JSON.stringify(response), {
      headers: {'Content-Type': 'application/json'},
      status: 200,
    });
  } catch (error) {
    console.error('Error updating cart attributes:', error);
    return new Response(
      JSON.stringify({message: 'Internal Server Error', success: false}),
      {headers: {'Content-Type': 'application/json'}, status: 500},
    );
  }
}
