import gql from 'graphql-tag';
import { MutationUpdaterFn } from 'apollo-boost';
import { AddTodoInput, AddTodoResponse, TodosResponse } from './schema';
import { todosQuery, TODOS_VARIABLES } from './todos.query';

export const addTodoMutation = gql`
  mutation($id: ID!, $text: String!) {
    addTodo(id: $id, text: $text) {
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

export const addTodoOptimisticResponse = ({
  id,
  text,
}: AddTodoInput): AddTodoResponse => ({
  __typename: 'Mutation',
  addTodo: {
    __typename: 'TodoUpdateResponse',
    success: true,
    message: 'Todo added successfully',
    todo: {
      __typename: 'Todo',
      id,
      text,
      isComplete: false,
      isArchived: false,
    },
  },
});

export const addTodoUpdate: MutationUpdaterFn<AddTodoResponse> = (
  store,
  mutationResult,
) => {
  const { data } = mutationResult;
  if (data == null) {
    throw new Error('No mutation result');
  } else if (data.addTodo.success === false) {
    throw new Error(data.addTodo.message);
  } else {
    const { todo } = data.addTodo;

    // get todos before update
    const queryResponse = store.readQuery<TodosResponse>({
      query: todosQuery,
      variables: TODOS_VARIABLES,
    });
    if (queryResponse === null) {
      throw new Error('No query result');
    }

    // add todo to cache (end unless sorted by descending `createdAt`)
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
  }
};
