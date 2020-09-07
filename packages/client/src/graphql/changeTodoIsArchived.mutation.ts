import gql from 'graphql-tag';

export default gql`
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
