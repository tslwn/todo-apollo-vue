import { v4 as uuidv4 } from 'uuid';
import {
  AddTodoInput,
  ChangeTodoTextInput,
  ChangeTodoIsCompleteInput,
  ChangeTodoIsArchivedInput,
  TodoUpdateResponse,
} from '../src/graphql/schema';

const todo = {
  __typename: 'Todo' as const,
  id: uuidv4(),
  text: 'Add unit tests',
  isComplete: false,
  isArchived: false,
};

export default {
  Query: {
    todos: () => [
      {
        id: uuidv4(),
        text: 'Add unit tests',
        isComplete: false,
        isArchived: false,
      },
      {
        id: uuidv4(),
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
        id: args.id,
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
        id: args.id,
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
        id: args.id,
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
        id: args.id,
        isArchived: args.isArchived,
      },
    }),
  },
};
