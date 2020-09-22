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
import { addTodoMutation, addTodoUpdate } from '../graphql/addTodo.mutation';

export default Vue.extend({
  name: 'add-todo',
  data: () => ({
    text: '',
  }),
  methods: {
    onEnter() {
      const { text } = this;

      this.text = '';

      this.$apollo
        .mutate({
          mutation: addTodoMutation,
          variables: {
            text,
          },
          update: addTodoUpdate,
          optimisticResponse: {
            __typename: 'Mutation',
            addTodo: {
              __typename: 'TodoUpdateResponse',
              success: true,
              message: 'Todo added successfully',
              todo: {
                __typename: 'Todo',
                // Mock ID
                id: -1,
                text,
                isComplete: false,
                isArchived: false,
              },
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

<style scoped></style>
