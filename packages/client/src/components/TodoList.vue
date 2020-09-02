<template>
  <div>
    <v-list>
      <todo v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo"></todo>
    </v-list>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import Todo from './Todo.vue';

export default Vue.extend({
  name: 'todo-list',
  components: {
    Todo,
  },
  data: () => ({ todos: [] }),
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
