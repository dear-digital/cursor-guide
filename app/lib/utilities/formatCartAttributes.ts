import type { CartApiQueryFragment } from 'storefrontapi.generated';

import type { Advisor } from '~/components/cart/HandleCartAttributeUpdate';

import { hasRequiresAdvisorMetafield } from '~/lib/utilities/checkRequiresAdvisorMetafield';

/**
 * Formats cart attributes for updating cart and line items.
 * - Removes empty attributes
 * - Preserves advisor data as a JSON string in cart attributes
 * - For "advisor" key (when not preserving), uses advisor.name for display
 */
export function formatCartAttributes(
  attributes: { key: string; value: Advisor[] | string }[],
  preserveAdvisor = false, // Option to preserve advisor data as JSON
) {
  return attributes
    .filter((attr) => attr.value !== '') // Remove empty attributes
    .map((attr) => {
      let value = attr.value;

      // Handle "advisor" key separately
      if (attr.key === 'advisor') {
        if (preserveAdvisor) {
          // Keep advisor data as JSON string (for cart attributes)
          value = typeof attr.value === 'string' ? attr.value : JSON.stringify(attr.value);
        } else {
          // Use advisor.name for display or line items.
          if (typeof attr.value === 'string') {
            const trimmed = attr.value.trim();
            // Only attempt JSON parsing if the string appears to be JSON
            if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
              try {
                const advisorData = JSON.parse(trimmed) as Advisor;
                value = advisorData.name || '';
              } catch (error) {
                console.error('Error parsing advisor value:', error);
                // Fallback to using the original string if JSON parsing fails
                value = attr.value;
              }
            } else {
              // If the string doesn't start with JSON delimiters, assume it's already the advisor's name.
              value = attr.value;
            }
          } else if (typeof attr.value === 'object' && attr.value !== null) {
            value = Array.isArray(attr.value)
              ? attr.value.map((advisor: Advisor) => (advisor.name || '').trim()).join(', ')
              : ((attr.value as Advisor).name || '').trim();
          }
        }
      }

      return {
        key: attr.key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
      };
    });
}

/**
 * Checks if the cart requires an advisor. If not, removes advisor-related attributes
 * from both cart attributes and line items.
 */
export async function processCartAttributes(cart: any): Promise<boolean> {
  const cartData = await cart.get(); // Fetch latest cart state
  if (!cartData) return false;

  const requiresAdvisor = hasRequiresAdvisorMetafield(
    cartData.lines as CartApiQueryFragment['lines'],
  );

  if (!requiresAdvisor) {
    console.log('Removing advisor attributes since no product requires an advisor.');

    // **Remove advisor attributes from cart**
    const existingAttributes = cartData?.attributes || [];
    const filteredAttributes = existingAttributes.filter(
      (attr: { key: string }) =>
        attr.key !== 'advisor_id' && attr.key !== 'advisor',
    );

    if (filteredAttributes.length !== existingAttributes.length) {
      try {
        await cart.updateAttributes(
          filteredAttributes.map((attr: { value: any }) => ({
            ...attr,
            value: attr.value ?? '',
          })),
        );
      } catch (error) {
        console.error('Error updating cart attributes:', error);
      }
    } else {
      console.log('No cart attributes to update, skipping update.');
    }

    // **Remove advisor attributes from line items**
    if (cartData?.lines?.nodes) {
      const linesToUpdate = cartData.lines.nodes.map(
        (line: { attributes: any[]; id: any }) => ({
          attributes: line.attributes
            .filter(
              (attr) => attr.key !== 'advisor_id' && attr.key !== 'advisor',
            )
            .map((attr) => ({ ...attr, value: attr.value ?? '' })),
          id: line.id,
        }),
      );

      if (
        linesToUpdate.some(
          (line: { attributes: any[] | string }, index: number | string) =>
            line.attributes.length !==
            cartData.lines.nodes[index].attributes.length,
        )
      ) {
        try {
          await cart.updateLines(linesToUpdate);
          console.log('Cart line attributes updated successfully.');
        } catch (error) {
          console.error('Error updating cart line attributes:', error);
        }
      } else {
        console.log('No line attributes to update, skipping update.');
      }
    }
  }

  return requiresAdvisor;
}