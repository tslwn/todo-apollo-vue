import { ApolloServer } from 'apollo-server';
import { Sequelize, DataTypes } from 'sequelize';

import resolvers from './resolvers';
import typeDefs from './schema';
import TodoAPI from './datasources/todo.datasource';

import sequelizeConfig from './sequelize.config.json';

const env = process.env.NODE_ENV || 'development';
const { database, username, password, ...config } = sequelizeConfig[env];

const sequelize = new Sequelize(
  database,
  username,
  password,
  config
);

const modelDefiners = [
  require('./models/todo.model')
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoAPI: new TodoAPI({ sequelize }),
  }),
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server running at ${url}`);
});
