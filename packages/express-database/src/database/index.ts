import 'dotenv/config';
import { Dialect, Options, Sequelize } from 'sequelize';
import process from 'process';

type DatabaseConfig = { [env: string]: Options };

export const databaseConfig: DatabaseConfig = {
  test: {
    storage: ':memory:',
    dialect: 'sqlite',
  },
  development: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT as Dialect,
  },
  production: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT as Dialect,
  },
}

export const database = new Sequelize(
  databaseConfig[process.env.NODE_ENV || 'development'],
);
