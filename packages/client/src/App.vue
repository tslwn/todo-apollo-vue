<template>
  <v-app id="app">
    <v-main>
      <v-container fluid>
        <add-todo />
        <todo-list />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

export default Vue.extend({
  name: 'app',
  components: {
    AddTodo,
    TodoList,
  },
});
</script>

<style>
</style>
