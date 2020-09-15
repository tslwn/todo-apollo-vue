import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils';
import { addTodoMutation, addTodoUpdate } from '../../graphql/addTodo.mutation';
import AddTodo from '../../components/AddTodo.vue';

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
  });

  /**
   * Snapshot tests.
   */

  const data = {
    text: 'Add unit tests',
  };

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
    const wrapper = createComponent();
    wrapper.setData(data);
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * User interaction tests.
   */

  it('onEnter method calls Apollo mutation', () => {
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
});
