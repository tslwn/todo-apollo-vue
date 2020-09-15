import { graphql } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils';
import {
  addTodoMutation,
  addTodoUpdate,
} from '../../src/graphql/addTodo.mutation';
import AddTodo from '../../src/components/AddTodo.vue';
import schema from '../mockSchema';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('AddTodo.vue', () => {
  let vuetify: typeof Vuetify;

  const createComponent = (options?: ThisTypedMountOptions<Vue>) => {
    return mount(AddTodo, {
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
   * Snapshot tests.
   */

  it('text is empty string by default', () => {
    const wrapper = createComponent();
    /**
     * As far as I'm aware, we can't infer wrapper.vm's type.
     * https://github.com/vuejs/vue-test-utils/issues/255#issuecomment-423743910
     */
    expect(wrapper.vm.$data.text).toBe('');
  });

  it('renders correctly without text', () => {
    const wrapper = createComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const data = {
      text: 'Add unit tests',
    };
    const wrapper = createComponent();
    wrapper.setData(data);
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * User interaction tests.
   */

  it('onEnter method calls Apollo mutation', () => {
    const data = {
      text: 'Add unit tests',
    };
    const mutate = jest.fn().mockImplementation(() => ({ catch: jest.fn() }));
    const wrapper = createComponent({
      mocks: {
        $apollo: {
          mutate,
        },
      },
    });
    // Simulate user input
    wrapper.setData(data);

    // See above ...
    (wrapper.vm as any).onEnter();
    expect(mutate).toHaveBeenCalledWith({
      mutation: addTodoMutation,
      variables: {
        text: data.text,
      },
      update: addTodoUpdate,
    });
  });

  /**
   * Mock schema tests.
   */

  it('called addTodo mutation with mock schema', async () => {
    const todo = {
      id: 0,
      text: 'Add unit tests',
      isComplete: false,
      isArchived: false,
    };
    const response = {
      success: true,
      message: 'Todo added successfully',
      todo,
    };
    const mutation = `
      mutation($text: String!) {
        addTodo(text: $text) {
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
        text: todo.text,
      },
    });
    if (result.data == null) {
      throw new Error('No mutation result');
    }
    expect(result.data.addTodo).toMatchObject(response);
  });
});
