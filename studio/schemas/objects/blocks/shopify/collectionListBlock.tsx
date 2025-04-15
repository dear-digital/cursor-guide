import { defineArrayMember, defineField } from 'sanity';

export function collectionListBlock(name = 'collections') {
  return defineField({
    name,
    type: 'array',
    options: {
      layout: 'grid',
    },
    of: [
      defineArrayMember({
        name: 'collection',
        type: 'reference',
        to: [{type: 'collection'}],
      }),
    ],
    validation: (Rule: any) =>
      Rule.custom((array: any) => {
        return checkForDuplicates(array);
      }),
  });
}

function checkForDuplicates<T>(array?: T[]): string | true {
  const uniqueSet = new Set<T>();

  if (!array || array.length === 0) {
    return 'Please add at least one collection.';
  }

  for (const item of array as any) {
    if (uniqueSet.has(item._ref)) {
      return 'Duplicate collection found. Please remove it from the list.';
    }

    uniqueSet.add(item._ref);
  }

  return true;
}
