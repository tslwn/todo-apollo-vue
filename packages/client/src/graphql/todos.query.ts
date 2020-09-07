import gql from 'graphql-tag';

export default gql`
  query($filter: TodoFilterInput, $orderBy: TodoOrderByInput) {
    todos(filter: $filter, orderBy: $orderBy) {
      id
      text
      isComplete
      isArchived
    }
  }
`;
