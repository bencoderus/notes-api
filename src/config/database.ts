import dotenv from 'dotenv';
dotenv.config();

export default {
  test: {
    username: process.env.TEST_DATABASE_USERNAME || '',
    password: process.env.TEST_DATABASE_PASSWORD || '',
    name: process.env.TEST_DATABASE_NAME || '',
    host: process.env.TEST_DATABASE_HOST || '',
  },
  development: {
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || '',
    host: process.env.DATABASE_HOST || '',
  },
  production: {
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || '',
    host: process.env.DATABASE_HOST || '',
  },
};
