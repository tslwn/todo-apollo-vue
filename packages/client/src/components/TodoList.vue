<template>
  <ul>
    <li v-bind:key="todo.id" v-for="todo in todos">{{ todo.text }}</li>
  </ul>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';

export default Vue.extend({
  name: 'todo-list',
  data: () => ({ todos: []  }),
  apollo: {
    todos: gql`{
      todos {
        id
        text
        isComplete
        isArchived
      }
    }`,
  },
});
</script>

<style scoped>
</style>
