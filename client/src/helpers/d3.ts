import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

interface HashTable<T> {
  [key: string]: T;
}

const createD3Tree = <T>(
  dataset: T[],
  idSelector: (item: T) => any,
  parentIdSelector: (item: T) => any,
): RawNodeDatum[] => {
  const hashTable: HashTable<RawNodeDatum> = {};
  dataset.forEach(
    (item) =>
      (hashTable[idSelector(item)] = {
        ...item,
        name: idSelector(item),
        children: [],
      }),
  );
  const dataTree: RawNodeDatum[] = [];
  dataset.forEach((item) => {
    if (parentIdSelector(item) != null) {
      hashTable[parentIdSelector(item)]?.children?.push(
        hashTable[idSelector(item)],
      );
    } else {
      dataTree.push(hashTable[idSelector(item)]);
    }
  });
  return dataTree;
};

export default createD3Tree;
