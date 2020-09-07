import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount, mount } from '@vue/test-utils';
import Todo from '../Todo.vue';

describe('Todo.vue', () => {
  Vue.use(Vuetify);

  const todo = {
    id: -1,
    text: 'Add unit tests',
    isComplete: false,
    isArchived: false,
  };

  it('renders correctly', () => {
    const wrapper = shallowMount(Todo, {
      propsData: { todo },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
