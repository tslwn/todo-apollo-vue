<template>
  <div>
    <v-slide-x-transition group tag="v-list">
      <todo
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:todo="todo"
      ></todo>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { todosQuery, TODOS_VARIABLES } from '../graphql/todos.query';
import Todo from './Todo.vue';

export default Vue.extend({
  name: 'todo-list',
  components: {
    Todo,
  },
  data: () => ({ todos: [] }),
  apollo: {
    todos: {
      query: todosQuery,
      variables: TODOS_VARIABLES,
    },
  },
});
</script>

<style scoped></style>
