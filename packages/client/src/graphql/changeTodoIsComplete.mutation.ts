import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $isComplete: Boolean!) {
    changeTodoIsComplete(id: $id, isComplete: $isComplete) {
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
