<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox disabled v-model="todo.isComplete"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-text="todo.text"></v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-btn icon disabled>
        <v-icon>{{ todo.isArchived ? 'mdi-archive-arrow-up' : 'mdi-archive' }}</v-icon>
      </v-btn>
    </v-list-item-icon>
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