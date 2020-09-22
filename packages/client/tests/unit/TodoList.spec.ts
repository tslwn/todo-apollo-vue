import { graphql } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import TodoList from '../../src/components/TodoList.vue';
import schema from '../mockSchema';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('TodoList.vue', () => {
  let vuetify: typeof Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    addMocksToSchema({ schema, preserveResolvers: true });
  });

  /**
   * Snapshot tests. Note that we are mocking the todos query data directly
   * rather than the schema response.
   */

  const todos = [
    {
      id: uuidv4(),
      text: 'Add unit tests',
      isComplete: false,
      isArchived: false,
    },
    {
      id: uuidv4(),
      text: 'Add integration tests',
      isComplete: true,
      isArchived: true,
    },
  ];

  it('renders correctly', () => {
    const wrapper = mount(TodoList, { localVue, vuetify });
    wrapper.setData({ todos });
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * Mock schema tests. Here we are mocking the schema response.
   */

  it('renders correctly with mock schema', async () => {
    const query = `query($filter: TodoFilterInput, $orderBy: TodoOrderByInput) {
      todos(filter: $filter, orderBy: $orderBy) {
        id
        text
        isComplete
        isArchived
      }
    }`;
    const wrapper = mount(TodoList, { localVue, vuetify });
    const result = await graphql(schema, query);
    if (result.data == null) {
      throw new Error('No query result');
    }
    wrapper.setData(result.data);
    expect(wrapper).toMatchSnapshot();
  });
});
