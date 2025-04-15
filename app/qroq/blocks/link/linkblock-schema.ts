import { z } from "groqd";

export const linkBlockSchema = z.object({
  _type: z.literal("linksBlock"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  buttons: z.array(
    z.object({
      _key: z.string(),
      _type: z.literal("internationalizedArrayLinkUrlBlockValue"),
      value: z
        .object({
          _type: z.string(),
          label: z.string().optional(),
          link: z
            .object({
              internalLinkPartial: z
                .object({
                  _ref: z.string(),
                  _type: z.literal("reference"),
                })
                .optional(),
            })
            .optional(),
        })
        .optional(),
    })
  ),
  layout: z.enum(["horizontal", "vertical"]).default("horizontal"),
  name: z.string(),
  sizing: z.enum(["fill", "hug", "50%"]).default("hug"),
  title: z.string(),
});