import { defineField } from "sanity";
import { imageResponsiveBlock } from "../blocks/imageResponsiveBlock";

export default defineField({
  name: "parallaxProductSection",
  title: "Parallax Product",
  type: "object",
  fields: [
    imageResponsiveBlock('productImage', true, 'Product Image'),
    imageResponsiveBlock('logoImage', true, 'Logo Image'),
    defineField({
      name: "darkMode",
      title: "Dark mode",
      type: "boolean",
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Parallax Product",
      };
    },
  },
})