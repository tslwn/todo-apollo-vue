import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils';
import {
  changeTodoIsArchivedMutation,
  changeTodoIsArchivedUpdate,
  changeTodoIsArchivedOptimisticResponse,
} from '../../graphql/changeTodoIsArchived.mutation';
import changeTodoIsCompleteMutation from '../../graphql/changeTodoIsComplete.mutation';
import Todo from '../Todo.vue';

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
    createdAt: Date.now(),
    updatedAt: Date.now(),
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
});
