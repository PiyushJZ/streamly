import { SequelizeOptions } from 'sequelize-typescript';
import { parse } from 'pg-connection-string';
import Config from '@lib/config';

const parsedDbConfig = parse(Config.DB_URL);

const localConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  username: Config.DB_USER,
  password: Config.DB_PASS,
  database: Config.DB_NAME,
  models: [__dirname + '/models'],
  logging: false,
  pool: {
    max: 20,
    min: 1,
    idle: 30 * 1000,
    acquire: 120 * 1000,
  },
};

const deployConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: parsedDbConfig.host || Config.DB_HOST,
  port: parsedDbConfig.port ? parseInt(parsedDbConfig.port) : Config.DB_PORT,
  username: parsedDbConfig.user,
  password: parsedDbConfig.password,
  database: parsedDbConfig.database || Config.DB_NAME,
  models: [__dirname + '/models'],
  logging: false,
  pool: {
    max: 20,
    min: 1,
    idle: 30 * 1000,
    acquire: 120 * 1000,
  },
};

let dbConfig: SequelizeOptions;
switch (Config.NODE_ENV) {
  case 'dev':
    dbConfig = localConfig;
    break;
  case 'localtest':
    dbConfig = localConfig;
    break;
  case 'test':
    dbConfig = deployConfig;
    break;
  case 'prod':
    dbConfig = deployConfig;
    break;
  default:
    dbConfig = localConfig;
    break;
}

export default dbConfig;
