<template>
  <v-text-field
    class="px-4"
    placeholder="Add todo"
    v-model="text"
    v-on:keyup.enter="onEnter"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
import { addTodoMutation, todosQuery } from '../graphql';
import { TODOS_VARIABLES } from './TodoList.vue';

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
          mutation: addTodoMutation,
          variables: {
            text,
          },
          update: (store, { data: { addTodo } }) => {
            const { message, success, todo } = addTodo;

            if (!success) {
              throw new Error(message);
            }

            const data = store.readQuery({
              query: todosQuery,
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
              query: todosQuery,
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
