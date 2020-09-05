import { gql } from 'apollo-server';
import { Todo } from 'types/todo.types';

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
    addTodo(text: String!): TodoUpdateResponse!
    changeTodoText(id: ID!, text: String!): TodoUpdateResponse!
    changeTodoIsComplete(id: ID!, isComplete: Boolean!): TodoUpdateResponse!
    changeTodoIsArchived(id: ID!, isArchived: Boolean!): TodoUpdateResponse!
  }
`;

export enum Sort {
  ASC,
  DESC
}

export interface TodoFilterInput {
  isComplete?: boolean
  isArchived?: boolean
}

export interface TodoOrderByInput {
  createdAt?: Sort
}

export interface TodoUpdateResponse {
  success: boolean
  message: string
  todo: Todo
}

export default schema;
