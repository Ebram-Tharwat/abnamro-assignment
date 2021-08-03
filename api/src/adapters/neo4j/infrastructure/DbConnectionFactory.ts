import { inject, injectable } from 'inversify';
import neo4j, { Driver, Session } from 'neo4j-driver';
import TYPES from '../../../container/types';
import DbConfiguration from './DbConfiguration';

export interface IDbConnectionFactory {
  openSession: (callback: (session: Session) => Promise<void>) => Promise<void>;
}

@injectable()
export default class DbConnectionFactory implements IDbConnectionFactory {
  private _driver: Driver;

  public constructor(@inject(TYPES.DbConfiguration) config: DbConfiguration) {
    this._driver = neo4j.driver(
      config.url,
      neo4j.auth.basic(config.username, config.password),
    );
  }

  public async openSession(callback: (sessionx: Session) => Promise<void>) {
    const openedSession = this._driver.session();
    try {
      await callback(openedSession);
    } finally {
      openedSession.close();
    }
  }
}
