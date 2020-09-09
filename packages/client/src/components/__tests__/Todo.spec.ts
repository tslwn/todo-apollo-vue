import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import Todo from '../Todo.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Todo.vue', () => {
  let vuetify: typeof Vuetify;

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
    const wrapper = mount(Todo, {
      localVue,
      vuetify,
      propsData: { todo },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with isComplete true, isArchived true', () => {
    const wrapper = mount(Todo, {
      localVue,
      vuetify,
      propsData: { todo: { ...todo, isArchived: true, isComplete: true } },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
