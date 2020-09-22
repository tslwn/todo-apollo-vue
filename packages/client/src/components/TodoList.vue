<template>
  <div>
    <v-slide-x-transition group tag="v-list">
      <todo
        v-for="todo in todosWithHash"
        v-bind:key="todo.hash"
        v-bind:todo="todo"
      ></todo>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { todosQuery, TODOS_VARIABLES } from '../graphql/todos.query';
import Todo from './Todo.vue';
import { Todo as ITodo } from '../graphql/schema';

interface TodoWithHash extends ITodo {
  hash: string;
}

export default Vue.extend({
  name: 'todo-list',
  components: {
    Todo,
  },
  data: () => ({ todos: [] as ITodo[] }),
  computed: {
    todosWithHash(): TodoWithHash[] {
      return this.todos.map((todo) => ({ hash: btoa(todo.text), ...todo }));
    },
  },
  apollo: {
    todos: {
      query: todosQuery,
      variables: TODOS_VARIABLES,
    },
  },
});
</script>

<style scoped></style>
