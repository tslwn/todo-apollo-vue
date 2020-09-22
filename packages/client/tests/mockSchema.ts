import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './mockResolvers';

const schema = `
  type Todo {
    id: ID!
    text: String!
    isComplete: Boolean!
    isArchived: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum Sort {
    ASC
    DESC
  }

  input TodoFilterInput {
    isComplete: Boolean
    isArchived: Boolean
  }

  input TodoOrderByInput {
    createdAt: Sort
  }

  type Query {
    todos(filter: TodoFilterInput, orderBy: TodoOrderByInput): [Todo]!
    todo(id: ID!): Todo
  }

  type TodoUpdateResponse {
    success: Boolean!
    message: String
    todo: Todo
  }

  type Mutation {
    addTodo(id: ID!, text: String!): TodoUpdateResponse!
    changeTodoText(id: ID!, text: String!): TodoUpdateResponse!
    changeTodoIsComplete(id: ID!, isComplete: Boolean!): TodoUpdateResponse!
    changeTodoIsArchived(id: ID!, isArchived: Boolean!): TodoUpdateResponse!
  }
`;

export default makeExecutableSchema({ typeDefs: schema, resolvers });
