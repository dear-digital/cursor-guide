import { q } from 'groqd';

export function textSizeQuery(name = 'textSize') {
  // Fetch the size name from some store or context
  const textSizeResult = q.string().nullable(); // Fetch the size based on `name`

  // Return the fetched size name or null if not found
  return textSizeResult;
}
