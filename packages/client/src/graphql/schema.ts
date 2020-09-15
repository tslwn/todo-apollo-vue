export interface Todo {
  __typename: 'Todo';
  id: number;
  text: string;
  isComplete: boolean;
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type TodosFilterInput = Partial<Pick<Todo, 'isComplete' | 'isArchived'>>;

export type TodosOrderByInputKey = keyof Pick<Todo, 'createdAt'>;

export type TodosOrderByInput = {
  [K in TodosOrderByInputKey]?: Sort;
};

export interface TodosInput {
  filter?: TodosFilterInput;
  orderBy?: TodosOrderByInput;
}

export type TodoInput = Pick<Todo, 'id'>;

export interface Query {
  __typename: 'Query';
}

export interface TodosResponse extends Query {
  todos: Todo[];
}

export type AddTodoInput = Pick<Todo, 'text'>;

export type ChangeTodoTextInput = Pick<Todo, 'id' | 'text'>;

export type ChangeTodoIsCompleteInput = Pick<Todo, 'id' | 'isComplete'>;

export type ChangeTodoIsArchivedInput = Pick<Todo, 'id' | 'isArchived'>;

interface TodoUpdateResponseGeneric {
  __typename: 'TodoUpdateResponse';
  success: boolean;
  message?: string;
}

interface TodoUpdateResponseSuccess extends TodoUpdateResponseGeneric {
  success: true;
  todo: Pick<Todo, '__typename' | 'id' | 'text' | 'isComplete' | 'isArchived'>;
}

interface TodoUpdateResponseFailure extends TodoUpdateResponseGeneric {
  success: false;
}

export type TodoUpdateResponse =
  | TodoUpdateResponseSuccess
  | TodoUpdateResponseFailure;

export interface Mutation {
  __typename: 'Mutation';
}

export interface AddTodoResponse extends Mutation {
  addTodo: TodoUpdateResponse;
}

export interface ChangeTodoTextResponse extends Mutation {
  changeTodoText: TodoUpdateResponse;
}

export interface ChangeTodoIsCompleteResponse extends Mutation {
  changeTodoIsComplete: TodoUpdateResponse;
}

export interface ChangeTodoIsArchivedResponse extends Mutation {
  changeTodoIsArchived: TodoUpdateResponse;
}
