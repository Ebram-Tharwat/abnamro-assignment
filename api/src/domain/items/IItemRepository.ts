import Item from './Item';

export default interface IItemRepository {
  getAll: () => Promise<Item[]>;
}
