import gql from 'graphql-tag';
import { MutationUpdaterFn } from 'apollo-boost';
import { Todo, ChangeTodoIsArchivedResponse, TodosResponse } from './schema';
import { todosQuery, TODOS_VARIABLES } from './todos.query';

export const changeTodoIsArchivedMutation = gql`
  mutation($id: ID!, $isArchived: Boolean!) {
    changeTodoIsArchived(id: $id, isArchived: $isArchived) {
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

export const changeTodoIsArchivedUpdate: MutationUpdaterFn<ChangeTodoIsArchivedResponse> = (
  store,
  mutationResult,
) => {
  const { data } = mutationResult;
  if (data == null) {
    throw new Error('No mutation result');
  } else if (data.changeTodoIsArchived.success === false) {
    throw new Error(data.changeTodoIsArchived.message);
  } else {
    const todo = data.changeTodoIsArchived.todo;

    // get todos before update
    const queryResponse = store.readQuery<TodosResponse>({
      query: todosQuery,
      variables: TODOS_VARIABLES,
    });
    if (queryResponse === null) {
      throw new Error('No query result');
    }

    // remove todo from query cache if not included by filter
    const todoInFilter =
      TODOS_VARIABLES?.filter?.isArchived === undefined ||
      TODOS_VARIABLES.filter.isArchived === todo.isArchived;

    if (!todoInFilter) {
      store.writeQuery({
        data: {
          todos: queryResponse.todos.filter(
            (item: Todo) => item.id !== todo?.id,
          ),
        },
        query: todosQuery,
        variables: TODOS_VARIABLES,
      });
    }
  }
};

/**
 * TODO: distinguish between 'attributes' and 'creation attributes' following
 * server package `src/types/todo.types`
 */
export const changeTodoIsArchivedOptimisticResponse = ({
  id,
  text,
  isComplete,
  isArchived,
}: Pick<
  Todo,
  'id' | 'text' | 'isComplete' | 'isArchived'
>): ChangeTodoIsArchivedResponse => ({
  __typename: 'Mutation',
  changeTodoIsArchived: {
    message: 'Todo isArchived changed successfully',
    success: true,
    todo: {
      __typename: 'Todo',
      id,
      text,
      isComplete,
      isArchived: !isArchived,
    },
    __typename: 'TodoUpdateResponse',
  },
});
