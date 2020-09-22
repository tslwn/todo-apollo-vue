<template>
  <v-text-field
    class="px-4"
    placeholder="Add todo"
    v-model="text"
    v-on:keyup.enter="onEnter"
  ></v-text-field>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import {
  addTodoMutation,
  addTodoOptimisticResponse,
  addTodoUpdate,
} from '../graphql/addTodo.mutation';

export default Vue.extend({
  name: 'add-todo',
  data: () => ({
    text: '',
  }),
  methods: {
    onEnter() {
      const { text } = this;

      // clear user input
      this.text = '';

      const id = uuidv4();

      this.$apollo
        .mutate({
          mutation: addTodoMutation,
          variables: {
            id,
            text,
          },
          optimisticResponse: addTodoOptimisticResponse({ id, text }),
          update: addTodoUpdate,
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
