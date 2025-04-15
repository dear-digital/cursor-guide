import { defineField } from "sanity"
import { imageResponsiveBlock } from "./imageResponsiveBlock";

export function parallaxBlock(name = 'parallax') {
  return defineField({
    name,
    title: "Parallax Product",
    type: "object",
    fields: [
      imageResponsiveBlock('productImage', true, 'Product Image', true),
      imageResponsiveBlock('logoImage', true, 'Logo Image', true),
    ],
    preview: {
      prepare() {
        return {
          title: "Parallax Product",
        };
      },
    },
  })
}
