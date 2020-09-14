<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox v-model="todo.isComplete" @change="onIsCompleteChange" />
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-text="todo.text"></v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-btn icon @click="onArchiveClick">
        <v-icon>{{ todo.isArchived ? 'mdi-delete-off' : 'mdi-delete' }}</v-icon>
      </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { Todo } from '../graphql/schema';
import {
  changeTodoIsArchivedMutation,
  changeTodoIsArchivedOptimisticResponse,
  changeTodoIsArchivedUpdate,
} from '../graphql/changeTodoIsArchived.mutation';
import changeTodoIsCompleteMutation from '../graphql/changeTodoIsComplete.mutation';
import { TODOS_VARIABLES } from '../graphql/todos.query';

export default Vue.extend({
  name: 'Todo',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  methods: {
    onIsCompleteChange(isComplete: boolean) {
      const { id } = this.todo;

      this.$apollo
        .mutate({
          mutation: changeTodoIsCompleteMutation,
          variables: {
            id,
            isComplete,
          },
        })
        .catch(() => {
          /**
           * TODO: I added this by analogy with `data.text` in AddTodo.vue, but
           * it is not correct: a method should not mutate props. Also, `mutate`
           * presumably doesn't cause a re-render if it errors.
           */
          this.todo.isComplete = !this.todo.isComplete;
        });
    },
    onArchiveClick() {
      const { id, isArchived } = this.todo;

      this.$apollo
        .mutate({
          mutation: changeTodoIsArchivedMutation,
          variables: {
            id,
            isArchived: !isArchived,
          },
          update: changeTodoIsArchivedUpdate,
          optimisticResponse: changeTodoIsArchivedOptimisticResponse(this.todo),
        })
        .catch(() => {
          // restore value
          this.todo.isArchived = isArchived;
        });
    },
  },
});
</script>
<style scoped></style>
