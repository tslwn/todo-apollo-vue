<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-text="todo.text"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
  isArchived: boolean;
}

export default Vue.extend({
  name: 'todo',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
});
</script>
<style scoped>
</style>