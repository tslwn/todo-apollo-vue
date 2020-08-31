import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';
import db from './db/models';
import TodoAPI from './datasources/todo';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoAPI: new TodoAPI({ sequelize: db.sequelize }),
  }),
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server running at ${url}`);
});
