import gql from 'graphql-tag';
import { TodosInput, Sort } from './schema';

export const todosQuery = gql`
  query($filter: TodoFilterInput, $orderBy: TodoOrderByInput) {
    todos(filter: $filter, orderBy: $orderBy) {
      id
      text
      isComplete
      isArchived
    }
  }
`;

export const TODOS_VARIABLES: TodosInput = {
  filter: {
    isArchived: false,
  },
  orderBy: {
    createdAt: Sort.Asc,
  },
};
