import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import AddTodo from '../AddTodo.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('AddTodo.vue', () => {
  let vuetify: typeof Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders correctly', () => {
    const wrapper = mount(AddTodo, {
      localVue,
      vuetify,
      propsData: { text: 'Add unit tests' },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
