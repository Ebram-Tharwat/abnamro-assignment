import { interfaces, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IItemRepository, Item } from '../domain/items';
import TYPES from '../container/types';

@controller('/api/items')
export default class ItemController implements interfaces.Controller {
  private _repo: IItemRepository;

  public constructor(@inject(TYPES.IItemRepository) repo: IItemRepository) {
    this._repo = repo;
  }

  @httpGet('/')
  public async index(): Promise<Item[]> {
    const result = await this._repo.getAll();
    return result;
  }
}
