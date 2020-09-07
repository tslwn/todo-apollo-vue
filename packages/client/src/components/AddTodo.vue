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

      // TODO: optimistic response breaks transition
      this.$apollo
        .mutate({
          mutation: gql`
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
          `,
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

            // add todo to cache
            const todos =
              TODOS_VARIABLES.orderBy.createdAt === 'DESC'
                ? [todo, ...data.todos]
                : [...data.todos, todo];

            store.writeQuery({
              data: {
                todos,
              },
              query: TODOS_QUERY,
              variables: TODOS_VARIABLES,
            });
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

<style scoped></style>
