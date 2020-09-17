import { graphql } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils';
import {
  changeTodoIsArchivedMutation,
  changeTodoIsArchivedUpdate,
  changeTodoIsArchivedOptimisticResponse,
} from '../../src/graphql/changeTodoIsArchived.mutation';
import changeTodoIsCompleteMutation from '../../src/graphql/changeTodoIsComplete.mutation';
import Todo from '../../src/components/Todo.vue';
import schema from '../mockSchema';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Todo.vue', () => {
  let vuetify: typeof Vuetify;

  const createComponent = (options?: ThisTypedMountOptions<Vue>) => {
    return mount(Todo, {
      localVue,
      vuetify,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    addMocksToSchema({ schema, preserveResolvers: true });
  });

  /**
   * Snapshot tests. Note that because isComplete and isArchived are independent
   * (the checkbox and icon button could be moved to child components) there is
   * no need to test the two remaining permutations.
   */

  const todo = {
    __typename: 'Todo' as const,
    id: -1,
    text: 'Add unit tests',
    isComplete: false,
    isArchived: false,
  };

  it('renders correctly with isComplete false, isArchived false', () => {
    const wrapper = createComponent({
      propsData: { todo },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with isComplete true, isArchived true', () => {
    const wrapper = createComponent({
      propsData: { todo: { ...todo, isArchived: true, isComplete: true } },
    });
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * User interaction tests. TODO: trigger events instead of calling methods
   * directly. I'm not sure whether it would be best to combine the two steps.
   */

  it('onIsCompleteChange method calls Apollo mutation', () => {
    const mutate = jest.fn().mockImplementation(() => ({ catch: jest.fn() }));
    const wrapper = createComponent({
      mocks: {
        $apollo: {
          mutate,
        },
      },
      propsData: {
        todo,
      },
    });
    const isComplete = !todo.isComplete;
    (wrapper.vm as any).onIsCompleteChange(isComplete);
    expect(mutate).toHaveBeenCalledWith({
      mutation: changeTodoIsCompleteMutation,
      variables: {
        id: todo.id,
        isComplete,
      },
    });
  });

  it('onArchiveClick method calls Apollo mutation', () => {
    const mutate = jest.fn().mockImplementation(() => ({ catch: jest.fn() }));
    const wrapper = createComponent({
      mocks: {
        $apollo: {
          mutate,
        },
      },
      propsData: {
        todo,
      },
    });
    (wrapper.vm as any).onArchiveClick();
    expect(mutate).toHaveBeenCalledWith({
      mutation: changeTodoIsArchivedMutation,
      variables: {
        id: todo.id,
        isArchived: !todo.isArchived,
      },
      update: changeTodoIsArchivedUpdate,
      optimisticResponse: changeTodoIsArchivedOptimisticResponse(todo),
    });
    /**
     * TODO: verify cache after `update` called. Could perhaps also check it's
     * called twice, first with the optimistic response and then the presumed
     * actual response.
     */
  });

  /**
   * Mock schema tests.
   */

  it('called changeTodoIsComplete mutation with mock schema', async () => {
    const response = {
      success: true,
      message: 'Todo isComplete changed successfully',
      todo: {
        id: 0,
        text: 'Add unit tests',
        isComplete: true,
        isArchived: false,
      },
    };
    const mutation = `
      mutation($id: ID!, $isComplete: Boolean!) {
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
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: {
        id: response.todo.id,
        isComplete: response.todo.isComplete,
      },
    });
    if (result.data == null) {
      throw new Error('No mutation result');
    }
    expect(result.data.changeTodoIsComplete).toMatchObject(response);
  });

  it('called changeTodoIsArchived mutation with mock schema', async () => {
    const response = {
      success: true,
      message: 'Todo isArchived changed successfully',
      todo: {
        id: 0,
        text: 'Add unit tests',
        isComplete: false,
        isArchived: true,
      },
    };
    const mutation = `
      mutation($id: ID!, $isArchived: Boolean!) {
        changeTodoIsArchived(id: $id, isArchived: $isArchived) {
          success
          message
          todo {
            id
            text
            isComplete
            isArchived
          }
        }
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: {
        id: response.todo.id,
        isArchived: response.todo.isArchived,
      },
    });
    if (result.data == null) {
      throw new Error('No mutation result');
    }
    expect(result.data.changeTodoIsArchived).toMatchObject(response);
  });
});
