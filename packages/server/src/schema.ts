import { gql } from 'apollo-server';

const schema = gql`
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

  input TodoOrderByInput {
    createdAt: Sort
  }

  type Query {
    todos(orderBy: TodoOrderByInput): [Todo]!
    todo(id: ID!): Todo
  }

  type TodoUpdateResponse {
    success: Boolean!
    message: String
    todo: Todo
  }

  type Mutation {
    addTodo(text: String!): TodoUpdateResponse!
    changeTodoText(id: ID!, text: String!): TodoUpdateResponse!
    changeTodoIsComplete(id: ID!, isComplete: Boolean!): TodoUpdateResponse!
    changeTodoIsArchived(id: ID!, isArchived: Boolean!): TodoUpdateResponse!
  }
`;

export default schema;
