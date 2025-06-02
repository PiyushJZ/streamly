import { Sequelize } from 'sequelize-typescript';
import config from './config';

export const sequelize = new Sequelize(config);

export default async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`DB connected [${process.env.NODE_ENV}]`);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
};
