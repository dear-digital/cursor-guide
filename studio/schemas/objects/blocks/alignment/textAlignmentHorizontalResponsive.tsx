import { defineField } from "sanity";
import { textAlignmentSingularPartial } from "../partials/textAlignmentSingularPartial";

export function textAlignmentResponsive(
  name = 'textAlignment',
) {
  return defineField({
    name, 
    description: 'Align text for mobile and desktop',
    type: 'object',
    fields: [
      textAlignmentSingularPartial('sm'),
      textAlignmentSingularPartial('lg')
    ],
  });
}
