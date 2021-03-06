import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';
import TodoAPI from './datasources/todo.datasource';
import sequelize from './models';

export type Context = {
  dataSources: {
    todoAPI: TodoAPI;
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoAPI: new TodoAPI({ sequelize })
  })
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server running at ${url}`);
});
