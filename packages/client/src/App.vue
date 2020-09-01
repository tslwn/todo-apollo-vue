<template>
  <div id="app">
    <todo-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoList from './components/TodoList.vue';

export default Vue.extend({
  name: 'app',
  components: {
    TodoList,
  },
});
</script>

<style>
</style>
