import {
  TodoUpdateResponse,
  TodosInput,
  TodoInput,
  AddTodoInput,
  ChangeTodoTextInput,
  ChangeTodoIsCompleteInput,
  ChangeTodoIsArchivedInput
} from 'schema';
import { Context } from 'index';
import { IResolvers } from 'apollo-server';

const resolvers: IResolvers<any, Context> = {
  Query: {
    todos: (_, { filter, orderBy }: TodosInput, { dataSources }) =>
      dataSources.todoAPI.getAllTodos({ filter, orderBy }),
    todo: (_, { id }: TodoInput, { dataSources }) =>
      dataSources.todoAPI.getTodoById({ id })
  },
  Mutation: {
    // TODO: refactor return/error logic
    addTodo: async (
      _,
      { text }: AddTodoInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      const todo = await dataSources.todoAPI.addTodo({
        text
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message
        };
      }
      return {
        success: true,
        message: 'Todo added successfully',
        todo: todo
      };
    },
    changeTodoText: async (
      _,
      { id, text }: ChangeTodoTextInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      const todo = await dataSources.todoAPI.changeTodoText({
        id,
        text
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message
        };
      }
      return {
        success: true,
        message: 'Todo text changed successfully',
        todo: todo
      };
    },
    changeTodoIsComplete: async (
      _,
      { id, isComplete }: ChangeTodoIsCompleteInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      const todo = await dataSources.todoAPI.changeTodoIsComplete({
        id,
        isComplete
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message
        };
      }
      return {
        success: true,
        message: 'Todo isComplete changed successfully',
        todo: todo
      };
    },
    changeTodoIsArchived: async (
      _,
      { id, isArchived }: ChangeTodoIsArchivedInput,
      { dataSources }
    ): Promise<TodoUpdateResponse> => {
      const todo = await dataSources.todoAPI.changeTodoIsArchived({
        id,
        isArchived
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message
        };
      }
      return {
        success: true,
        message: 'Todo isArchived changed successfully',
        todo: todo
      };
    }
  }
};

export default resolvers;
