import 'reflect-metadata';
import { Mock } from 'moq.ts';
import ItemController from './ItemController';
import { IItemRepository, Item } from '../domain/items';

describe('ItemController', () => {
  describe('Index page', () => {
    const getSampleData = () => {
      const a = { name: 'A', description: 'A description', parent: null };
      const b = { name: 'B', description: 'B description', parent: a };
      const c = { name: 'C', description: 'C description', parent: b };
      return [a, b, c];
    };
    test('returns correct results', async () => {
      const data: Item[] = getSampleData();
      const mock = new Mock<IItemRepository>()
        .setup((instance) => instance.getAll())
        .returns(Promise.resolve(data));

      const sut = new ItemController(mock.object());
      const response = await sut.index();
      expect(response).toEqual(data);
    });

    test('throws exception on errors', async () => {
      const exception = new Error('Unable to fetch items');
      const mock = new Mock<IItemRepository>()
        .setup((instance) => instance.getAll())
        .throws(exception);

      try {
        const sut = new ItemController(mock.object());
        await sut.index();
      } catch (error) {
        expect(error).toBe(exception);
      }
    });
  });
});
