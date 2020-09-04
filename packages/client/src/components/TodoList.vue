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

// move to graphql directory or similar
export const TODOS_QUERY = gql`query ($filter: TodoFilterInput, $orderBy: TodoOrderByInput){
  todos(filter: $filter, orderBy: $orderBy) {
    id
    text
    isComplete
    isArchived
  }
}`;

export interface TodoInput {
  filter?: {
    isComplete?: boolean;
    isArchived?: boolean
  };
  orderBy?: {
    createdAt?: 'ASC' | 'DESC',
  };
}

export const TODOS_VARIABLES: TodoInput = {
  filter: {
    isArchived: false,
  },
  orderBy: {
    createdAt: 'DESC',
  },
};

export default Vue.extend({
  name: 'todo-list',
  components: {
    Todo,
  },
  data: () => ({ todos: [] }),
  apollo: {
    todos: {
      query: TODOS_QUERY,
      variables: TODOS_VARIABLES,
    },
  },
});
</script>

<style scoped>
</style>
