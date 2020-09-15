import {
  AddTodoInput,
  ChangeTodoTextInput,
  ChangeTodoIsCompleteInput,
  ChangeTodoIsArchivedInput,
  TodoUpdateResponse,
} from '../src/graphql/schema';

const todo = {
  __typename: 'Todo' as 'Todo',
  id: 0,
  text: 'Add unit tests',
  isComplete: false,
  isArchived: false,
};

export default {
  Query: {
    todos: () => [
      {
        id: -2,
        text: 'Add unit tests',
        isComplete: false,
        isArchived: false,
      },
      {
        id: -1,
        text: 'Add integration tests',
        isComplete: true,
        isArchived: true,
      },
    ],
  },
  Mutation: {
    // TODO: return Promise?
    addTodo: (_: any, args: AddTodoInput): TodoUpdateResponse => ({
      __typename: 'TodoUpdateResponse',
      success: true,
      message: 'Todo added successfully',
      todo: {
        ...todo,
        text: args.text,
      },
    }),
    changeTodoText: (
      _: any,
      args: ChangeTodoTextInput,
    ): TodoUpdateResponse => ({
      __typename: 'TodoUpdateResponse',
      success: true,
      message: 'Todo text changed successfully',
      todo: {
        ...todo,
        text: args.text,
      },
    }),
    changeTodoIsComplete: (
      _: any,
      args: ChangeTodoIsCompleteInput,
    ): TodoUpdateResponse => ({
      __typename: 'TodoUpdateResponse',
      success: true,
      message: 'Todo isComplete changed successfully',
      todo: {
        ...todo,
        isComplete: args.isComplete,
      },
    }),
    changeTodoIsArchived: (
      _: any,
      args: ChangeTodoIsArchivedInput,
    ): TodoUpdateResponse => ({
      __typename: 'TodoUpdateResponse',
      success: true,
      message: 'Todo isArchived changed successfully',
      todo: {
        ...todo,
        isArchived: args.isArchived,
      },
    }),
  },
};
