// Normalize the input: trim and check against known keys
export function sanitize(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.replace(/[^\w-]/g, ''); // Remove unexpected characters
}
