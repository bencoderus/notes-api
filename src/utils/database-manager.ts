import config from '../config';
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from 'typeorm';
import logger from './logger';

const environment = config.app.env;

export default class DatabaseManager {
  public static async createConnection(): Promise<Connection | undefined> {
    try {
      const connectionOptions = await getConnectionOptions(environment);
      const connection = await createConnection({
        ...connectionOptions,
        name: 'default',
      });

      return connection;
    } catch (error) {
      throw error;
    }
  }

  public static async closeConnection(): Promise<boolean> {
    try {
      await getConnection().close();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
