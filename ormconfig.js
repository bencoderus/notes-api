// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = [
  {
    name: 'development',
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'notes_api',
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
  {
    name: 'production',
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'notes_api',
    synchronize: true,
    logging: false,
    entities: ['dist/database/entity/**/*.ts'],
    migrations: ['dist/database/migration/**/*.ts'],
    subscribers: ['dist/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'dist/database/entity',
      migrationsDir: 'dist/database/migration',
      subscribersDir: 'dist/database/subscriber',
    },
  },
  {
    name: 'staging',
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'notes_api',
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
  {
    name: 'test',
    type: 'mysql',
    host: process.env.TEST_DATABASE_HOST || 'localhost',
    port: process.env.TEST_DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.TEST_DATABASE_PASSWORD || '',
    database: process.env.TEST_DATABASE_NAME || 'notes_test',
    synchronize: true,
    logging: false,
    entities: ['src/database/entity/**/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/database/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/database/subscriber',
    },
  },
];
