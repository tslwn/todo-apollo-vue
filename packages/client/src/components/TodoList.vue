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

export const TODOS_QUERY = gql`query ($orderBy: TodoOrderByInput){
  todos(orderBy: $orderBy) {
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
    todos: {
      query: TODOS_QUERY,
      variables: {
        orderBy: {
          createdAt: 'ASC',
        },
      },
    },
  },
});
</script>

<style scoped>
</style>
