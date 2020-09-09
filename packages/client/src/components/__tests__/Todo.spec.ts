import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils';
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
   * It's presumably also possible to assert that `mutate` is called with the
   * correct argument.
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
    (wrapper.vm as any).onIsCompleteChange();
    expect(mutate).toBeCalled();
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
    expect(mutate).toBeCalled();
  });
});
