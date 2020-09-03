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

export const TODOS_QUERY = gql`{
  todos {
    id
    text
    isComplete
    isArchived
  }
}`;

export default Vue.extend({
  name: 'todo-list',
  components: {
    Todo,
  },
  data: () => ({ todos: [] }),
  apollo: {
    todos: TODOS_QUERY,
  },
});
</script>

<style scoped>
</style>
