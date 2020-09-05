import { gql } from 'apollo-server';
import { Todo, TodoAttributes } from 'types/todo.types';

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

export type TodosFilterInput = Partial<Pick<Todo, 'isComplete' | 'isArchived'>>;

type TodosOrderByInputKey = keyof Pick<Todo, 'createdAt'>;

export type TodosOrderByInput = {
  [index: string]: { [K in TodosOrderByInputKey]?: Sort };
};

export interface TodosInput {
  filter?: TodosFilterInput;
  orderBy?: TodosOrderByInput;
}

export type TodoInput = Pick<Todo, 'id'>;

export type AddTodoInput = Pick<Todo, 'text'>;

export type ChangeTodoTextInput = Pick<Todo, 'id' | 'text'>;

export type ChangeTodoIsCompleteInput = Pick<Todo, 'id' | 'isComplete'>;

export type ChangeTodoIsArchivedInput = Pick<Todo, 'id' | 'isArchived'>;

export interface TodoUpdateResponse {
  success: boolean;
  message?: string;
  todo?: Todo;
}

export default schema;
