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

      // TODO: optimistic response breaks transition
      this.$apollo
        .mutate({
          mutation: addTodoMutation,
          variables: {
            text,
          },
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
