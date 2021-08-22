import config from '../config';
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from 'typeorm';
import logger from './logger.service';

const environment = config.app.env;

export default class DatabaseService {
  public static async createConnection(): Promise<Connection | undefined> {
    try {
      const connectionOptions = await getConnectionOptions(environment);
      const connection = await createConnection({
        ...connectionOptions,
        name: 'default',
      });

      return connection;
    } catch (error) {
      logger.error(error.toString());
      throw error;
    }
  }

  public static async closeConnection(): Promise<boolean> {
    try {
      await getConnection().close();

      return true;
    } catch (error) {
      logger.error(error);

      return false;
    }
  }
}
