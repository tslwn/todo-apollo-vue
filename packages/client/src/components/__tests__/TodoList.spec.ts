import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import TodoList from '../TodoList.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('TodoList.vue', () => {
  let vuetify: typeof Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  /**
   * Snapshot tests. Note that we are mocking the todos query data directly
   * rather than the schema response.
   */

  const todos = [
    {
      id: -2,
      text: 'Add unit tests',
      isComplete: false,
      isArchived: false,
    },
    {
      id: -1,
      text: 'Add integration tests',
      isComplete: true,
      isArchived: true,
    },
  ];

  it('renders correctly', () => {
    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
    });
    wrapper.setData({ todos });
    expect(wrapper).toMatchSnapshot();
  });
});
