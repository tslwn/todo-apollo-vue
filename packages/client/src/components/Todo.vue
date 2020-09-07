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
import {
  changeTodoIsArchivedMutation,
  changeTodoIsCompleteMutation,
  todosQuery,
} from '../graphql';
import { TODOS_VARIABLES } from './TodoList.vue';

// export from somewhere?
interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
  isArchived: boolean;
}

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
          this.todo.isComplete = !this.todo.isComplete;
        });
    },
    onArchiveClick() {
      const { id, text, isComplete, isArchived } = this.todo;

      this.$apollo
        .mutate({
          mutation: changeTodoIsArchivedMutation,
          variables: {
            id,
            isArchived: !isArchived,
          },
          update: (store, { data: { changeTodoIsArchived } }) => {
            const { message, success, todo } = changeTodoIsArchived;

            if (!success) {
              throw new Error(message);
            }

            const data = store.readQuery({
              query: todosQuery,
              variables: TODOS_VARIABLES,
            });

            // remove todo from query cache if not included by filter
            const todoInFilter =
              TODOS_VARIABLES.filter.isArchived === undefined ||
              TODOS_VARIABLES.filter.isArchived === todo.isArchived;

            if (!todoInFilter) {
              store.writeQuery({
                data: {
                  todos: data.todos.filter((item: Todo) => item.id !== todo.id),
                },
                query: todosQuery,
                variables: TODOS_VARIABLES,
              });
            }
          },
          optimisticResponse: {
            __typename: 'Mutation',
            changeTodoIsArchived: {
              message: 'Todo isArchived changed successfully',
              success: true,
              todo: {
                __typename: 'Todo',
                id,
                text,
                isComplete,
                isArchived: !isArchived,
              },
              __typename: 'TodoUpdateResponse',
            },
          },
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
