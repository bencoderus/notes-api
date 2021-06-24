import dotenv from "dotenv";
dotenv.config();

export default {
  test: {
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    name: process.env.DATABASE_NAME || "",
    host: process.env.DATABASE_HOST || "",
    dialect: process.env.DATABASE_DIALECT || "",
  },
  development: {
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    name: process.env.DATABASE_NAME || "",
    host: process.env.DATABASE_HOST || "",
    dialect: process.env.DATABASE_DIALECT || "",
  },
  production: {
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    name: process.env.DATABASE_NAME || "",
    host: process.env.DATABASE_HOST || "",
    dialect: process.env.DATABASE_DIALECT || "",
  },
};
