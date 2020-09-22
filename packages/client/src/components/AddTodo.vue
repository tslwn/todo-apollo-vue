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
            id: uuidv4(),
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
