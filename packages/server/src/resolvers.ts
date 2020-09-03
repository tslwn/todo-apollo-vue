const resolvers = {
  Query: {
    todos: (_, { orderBy }, { dataSources }) =>
      dataSources.todoAPI.getAllTodos({ orderBy }),
    todo: (_, { id }, { dataSources }) =>
      dataSources.todoAPI.getTodoById({ id }),
  },
  Mutation: {
    // TODO: refactor return/error logic
    addTodo: async (_, { text }, { dataSources }) => {
      const todo = await dataSources.todoAPI.addTodo({
        text,
      });
      console.log(todo);
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message,
        };
      }
      return {
        success: true,
        message: 'Todo added successfully',
        todo: todo,
      };
    },
    changeTodoText: async (_, { id, text }, { dataSources }) => {
      const todo = await dataSources.todoAPI.changeTodoText({
        id,
        text,
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message,
        };
      }
      return {
        success: true,
        message: 'Todo text changed successfully',
        todo: todo,
      };
    },
    changeTodoIsComplete: async (_, { id, isComplete }, { dataSources }) => {
      const todo = await dataSources.todoAPI.changeTodoIsComplete({
        id,
        isComplete,
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message,
        };
      }
      return {
        success: true,
        message: 'Todo isComplete changed successfully',
        todo: todo,
      };
    },
    changeTodoIsArchived: async (_, { id, isArchived }, { dataSources }) => {
      const todo = await dataSources.todoAPI.changeTodoIsArchived({
        id,
        isArchived,
      });
      if (todo instanceof Error) {
        return {
          success: false,
          message: todo.message,
        };
      }
      return {
        success: true,
        message: 'Todo isArchived changed successfully',
        todo: todo,
      };
    },
  },
};

export default resolvers;
