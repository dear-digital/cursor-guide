/**
 * Checks for duplicate items in an array based on the `_ref` property.
 *
 * @template T - The type of items in the array.
 * @param {T[]} [array] - The array to check for duplicates. If not provided or empty, an error message is returned.
 * @returns {string | true} - Returns a string with an error message if duplicates are found or if the array is empty.
 *                            Returns `true` if no duplicates are found.
 */

export default function checkForDuplicates<T>(array?: T[]): string | true {
  const uniqueSet = new Set<T>();

  if (!array || array.length === 0) {
    return 'Please add at least one item.';
  }

  for (const item of array as any) {
    if (uniqueSet.has(item._ref)) {
      return 'Duplicates found - Please remove them.';
    }

    uniqueSet.add(item._ref);
  }

  return true;
}
