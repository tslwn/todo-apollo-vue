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
    // get ID when component initialised
    id: uuidv4(),
    text: '',
  }),
  methods: {
    onEnter() {
      const { id, text } = this;

      // get new ID and clear user input
      this.id = uuidv4();
      this.text = '';

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
