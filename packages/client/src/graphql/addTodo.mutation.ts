import gql from 'graphql-tag';

export default gql`
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
