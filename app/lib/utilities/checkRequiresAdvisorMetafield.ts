import type { CartApiQueryFragment } from "storefrontapi.generated";


export const hasRequiresAdvisorMetafield = (lines?: CartApiQueryFragment['lines']): boolean => {
    return lines?.nodes.some((line) =>
      line.merchandise.product.metafields.some(
        (metafield) => metafield?.key === "requires_advisor" && metafield.value === "true"
      )
    ) ?? false;
  };
  