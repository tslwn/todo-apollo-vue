import { Sequelize, DataTypes } from 'sequelize';
import sequelizeConfig from '../sequelize.config.json';

const environment = process.env.NODE_ENV || 'development';

const { database, username, password, ...config } = (sequelizeConfig as {
  [key: string]: {
    host?: string;
    port?: number;
    username: string;
    password?: string;
    database: string;
  };
})[environment];

const sequelize = new Sequelize(database, username, password, {
  logging: () => {},
  ...config
});

const modelDefiners = [require('./todo.model')];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

export default sequelize;
