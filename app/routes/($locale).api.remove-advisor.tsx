import type {ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({context, request}: ActionFunctionArgs) {
  try {
    // Retrieve existing cart
    const {cart} = context;
    const currentCart = await cart.get();

    if (!currentCart) {
      return new Response(
        JSON.stringify({message: 'Cart not found', success: false}),
        {headers: {'Content-Type': 'application/json'}, status: 404},
      );
    }

    const existingAttributes = currentCart?.attributes || [];

    // Remove advisor-related attributes
    const filteredAttributes = existingAttributes.filter(
      (attr) => attr.key !== 'advisor' && attr.key !== 'advisor_id',
    );

    // Only update if there were advisor attributes to remove
    if (filteredAttributes.length !== existingAttributes.length) {
      // Update cart attributes
      const response = await cart.updateAttributes(
        filteredAttributes.map((attr) => ({
          ...attr,
          value: attr.value ?? '',
        })),
      );

      // Update cart lines to remove advisor attributes
      if (currentCart?.lines?.nodes?.length) {
        const linesToUpdate = currentCart.lines.nodes.map((line) => ({
          attributes: line.attributes
            .filter((attr) => attr.key !== 'advisor' && attr.key !== 'advisor_id')
            .map((attr) => ({key: attr.key, value: attr.value ?? ''})),
          id: line.id,
        }));

        await cart.updateLines(linesToUpdate);
      }

      return new Response(
        JSON.stringify({
          message: 'Advisor removed successfully',
          success: true,
        }),
        {headers: {'Content-Type': 'application/json'}, status: 200},
      );
    }

    // No advisor attributes found to remove
    return new Response(
      JSON.stringify({
        message: 'No advisor attributes found',
        success: true,
      }),
      {headers: {'Content-Type': 'application/json'}, status: 200},
    );
  } catch (error) {
    console.error('Error removing advisor from cart:', error);
    return new Response(
      JSON.stringify({
        message: 'Error removing advisor from cart',
        success: false,
      }),
      {headers: {'Content-Type': 'application/json'}, status: 500},
    );
  }
} 