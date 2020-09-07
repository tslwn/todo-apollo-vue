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
import Todo from './Todo.vue';
import todosQuery from '../graphql/todos.query';

export interface TodoInput {
  filter?: {
    isComplete?: boolean;
    isArchived?: boolean;
  };
  orderBy?: {
    createdAt?: 'ASC' | 'DESC';
  };
}

export const TODOS_VARIABLES: TodoInput = {
  filter: {
    isArchived: false,
  },
  orderBy: {
    createdAt: 'ASC',
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
      query: todosQuery,
      variables: TODOS_VARIABLES,
    },
  },
});
</script>

<style scoped></style>
