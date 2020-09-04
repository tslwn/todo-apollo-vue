<template>
  <v-text-field
    class="px-4"
    placeholder="Add todo"
    v-model="text"
    v-on:keyup.enter="onEnter"
  ></v-text-field>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';

import { TODOS_QUERY, TODOS_VARIABLES } from './TodoList.vue';

export default Vue.extend({
  name: 'add-todo',
  data: () => ({
    text: '',
  }),
  methods: {
    onEnter() {
      const { text } = this;

      this.text = '';

      this.$apollo.mutate({
        mutation: gql`mutation ($text: String!) {
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
        }`,
        variables: {
          text,
        },
        update: (store, { data: { addTodo } }) => {
          const { message, success, todo } = addTodo;

          if (!success) {
            throw new Error(message);
          }

          const data = store.readQuery({
            query: TODOS_QUERY,
            variables: TODOS_VARIABLES,
          });

          // prepend todo in cache (most recent)
          store.writeQuery({
            data: {
              todos: [todo, ...data.todos],
            },
            query: TODOS_QUERY,
            variables: TODOS_VARIABLES,
          });
        },
        // export somewhere as constant?
        optimisticResponse: {
          __typename: 'Mutation',
          addTodo: {
            message: 'Todo added successfully',
            success: true,
            todo: {
              __typename: 'Todo',
              id: -1,
              text,
              isComplete: false,
              isArchived: false,
            },
            __typename: 'TodoUpdateResponse',
          },
        },
      })
        .catch(() => {
          // restore user input
          this.text = text;
        });
    },
  },
});
</script>

<style scoped>
</style>
