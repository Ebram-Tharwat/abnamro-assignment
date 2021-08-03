import { Container } from 'inversify';
import DbConfiguration, {
  readFromEnv,
} from '../adapters/neo4j/infrastructure/DbConfiguration';
import DbConnectionFactory, {
  IDbConnectionFactory,
} from '../adapters/neo4j/infrastructure/DbConnectionFactory';
import ItemRepository from '../adapters/neo4j/repositories/ItemRepository';
import { IItemRepository } from '../domain/items';
import TYPES from './types';

export const bootstrap = (): Container => {
  const container = new Container();
  container
    .bind<DbConfiguration>(TYPES.DbConfiguration)
    .toConstantValue(readFromEnv());
  container
    .bind<IDbConnectionFactory>(TYPES.IDbConnectionFactory)
    .to(DbConnectionFactory);
  container.bind<IItemRepository>(TYPES.IItemRepository).to(ItemRepository);
  return container;
};

// export default { bootstrap };
