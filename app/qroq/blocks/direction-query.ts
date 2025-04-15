import { q, z } from "groqd";
import { TEXT_IMAGE_DIRECTIONS } from "~/lib/constants/text-image-directions";

export function textImageDirectionBlockQuery(name = 'direction') {
  return q(name)
    .grabOne('direction', z.enum(TEXT_IMAGE_DIRECTIONS).default('TextImage'));
}
