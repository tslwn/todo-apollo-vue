import gql from 'graphql-tag';
import { MutationUpdaterFn } from 'apollo-boost';
import { AddTodoResponse, TodosResponse } from './schema';
import { todosQuery, TODOS_VARIABLES } from './todos.query';

export const addTodoMutation = gql`
  mutation($text: String!) {
    addTodo(text: $text) {
      success
      message
      todo {
        id
        text
        isComplete
        isArchived
      }
    }
  }
`;

export const addTodoUpdate: MutationUpdaterFn<AddTodoResponse> = (
  store,
  mutationResult,
) => {
  const { data } = mutationResult;
  if (!data) {
    throw new Error('No mutation result');
  }

  const { message, success, todo } = data.addTodo;
  if (!success) {
    throw new Error(message);
  }

  const queryResponse = store.readQuery<TodosResponse>({
    query: todosQuery,
    variables: TODOS_VARIABLES,
  });
  if (queryResponse === null) {
    throw new Error('No query result');
  }

  // add todo to cache
  const todos =
    TODOS_VARIABLES?.orderBy?.createdAt === 'DESC'
      ? [todo, ...queryResponse.todos]
      : [...queryResponse.todos, todo];

  store.writeQuery({
    data: {
      todos,
    },
    query: todosQuery,
    variables: TODOS_VARIABLES,
  });
};
