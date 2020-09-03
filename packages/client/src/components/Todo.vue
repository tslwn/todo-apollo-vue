<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox
        v-model="todo.isComplete"
        @change="onIsCompleteChange"
      ></v-checkbox>
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
import gql from 'graphql-tag';
import Vue, { PropType } from 'vue';

// export from somewhere?
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
  methods: {
    onIsCompleteChange(isComplete: boolean) {
      const { id } = this.todo;

      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $isComplete: Boolean!) {
          changeTodoIsComplete(id: $id, isComplete: $isComplete) {
            success
            message
            todo {
              id
              text
              isComplete
              isArchived
            }
          }
        }`,
        variables: {
          id,
          isComplete,
        },
      })
        .catch(() => {
          this.todo.isComplete = !this.todo.isComplete;
        });
    },
  },
});
</script>
<style scoped>
</style>
