import { IResolvers } from 'apollo-server';
import { Context } from 'index';
import {
  TodoUpdateResponse,
  TodosInput,
  TodoInput,
  AddTodoInput,
  ChangeTodoTextInput,
  ChangeTodoIsCompleteInput,
  ChangeTodoIsArchivedInput
} from 'schema';
import TodoAPI from 'datasources/todo.datasource';
import { Todo } from 'types/todo.types';

// TODO: move to datasource?
const todoUpdate = async <T>(
  context: TodoAPI,
  func: (args: T) => Promise<Todo | Error>,
  args: T,
  message: string
) => {
  const todoOrError = await func.bind(context)(args);
  if (todoOrError instanceof Error) {
    return {
      success: false,
      message: todoOrError.message
    };
  }
  return {
    success: true,
    message,
    todo: todoOrError
  };
};

const resolvers: IResolvers<any, Context> = {
  Query: {
    todos: (_, { filter, orderBy }: TodosInput, { dataSources }) =>
      dataSources.todoAPI.getAllTodos({ filter, orderBy }),
    todo: (_, { id }: TodoInput, { dataSources }) =>
      dataSources.todoAPI.getTodoById({ id })
  },
  Mutation: {
    addTodo: async (
      _,
      args: AddTodoInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      return await todoUpdate(
        dataSources.todoAPI,
        dataSources.todoAPI.addTodo,
        args,
        'Todo added successfully'
      );
    },
    changeTodoText: async (
      _,
      args: ChangeTodoTextInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      return await todoUpdate(
        dataSources.todoAPI,
        dataSources.todoAPI.changeTodoText,
        args,
        'Todo text changed successfully'
      );
    },
    changeTodoIsComplete: async (
      _,
      args: ChangeTodoIsCompleteInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      return await todoUpdate(
        dataSources.todoAPI,
        dataSources.todoAPI.changeTodoIsComplete,
        args,
        'Todo isComplete changed successfully'
      );
    },
    changeTodoIsArchived: async (
      _,
      args: ChangeTodoIsArchivedInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      return await todoUpdate(
        dataSources.todoAPI,
        dataSources.todoAPI.changeTodoIsArchived,
        args,
        'Todo isArchived changed successfully'
      );
    }
  }
};

export default resolvers;
