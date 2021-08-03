import neo4j, { Driver, Session } from 'neo4j-driver';
import DbConfiguration, { readFromEnv } from './DbConfiguration';

export interface IDbConnectionFactory {
  openSession: (callback: (session: Session) => Promise<void>) => Promise<void>;
}

export default class DbConnectionFactory implements IDbConnectionFactory {
  private _driver: Driver;

  public constructor(config: DbConfiguration) {
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
