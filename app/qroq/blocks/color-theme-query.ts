import { q, z } from "groqd";

export function colorThemeBlockQuery(name = 'colorTheme') {
  return q(name).grabOne('colorTheme', z.enum(['light', 'dark']).default('light'));
}
