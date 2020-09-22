import sequelize from '../models';
import { Sort } from '../schema';
import { Todo } from 'types/todo.types';
import TodoAPI from './todo.datasource';

const todoAPI = new TodoAPI({ sequelize });

// This must be in sync with the seed data
const initialTodo = {
  id: '85683357-809d-47c6-b0cf-76866bbe7933',
  text: 'Buy milk',
  isComplete: false,
  isArchived: false,
};

afterAll(() => {
  sequelize.close();
});

test('model is defined', () => {
  expect(todoAPI.model).toBeDefined();
});

describe('getAllTodos', () => {
  test('returns four todos with no filter', async () => {
    const todos = (await todoAPI.getAllTodos({})) as Todo[];
    expect(todos.length).toBe(4);
  });

  test('returns two todos with filter isComplete', async () => {
    const todos = (await todoAPI.getAllTodos({
      filter: { isComplete: true },
    })) as Todo[];
    expect(todos.length).toBe(2);
  });

  test('returns todos in order', async () => {
    const todos = (await todoAPI.getAllTodos({
      orderBy: { createdAt: Sort.Desc },
    })) as Todo[];
    const sortedTodos = todos.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    expect(todos).toEqual(sortedTodos);
  });
});

describe('getTodoById', () => {
  test('returns todo', async () => {
    const todo = (await todoAPI.getTodoById({ id: initialTodo.id })) as Todo;
    expect(todo).toMatchObject(initialTodo);
  });

  test('returns error when no data found', async () => {
    const error = await todoAPI.getTodoById({
      id: 'not-a-uuid',
    });
    expect(error).toBeInstanceOf(Error);
  });
});

describe('addTodo', () => {
  test('returns added todo when successful', async () => {
    // Database will generate UUID
    const addedTodo = {
      text: 'Test addTodo',
      isComplete: false,
      isArchived: false,
    };
    const todo = (await todoAPI.addTodo({ text: addedTodo.text })) as Todo;

    // Todo instance has other fields
    expect(todo).toMatchObject(addedTodo);

    // Delete instance to restore database
    todo.destroy();
  });
});

describe('changeTodoText', () => {
  test('returns changed todo when successful', async () => {
    const changedTodo = {
      ...initialTodo,
      text: 'Test changeTodoText',
    };
    const todo = (await todoAPI.changeTodoText({
      id: changedTodo.id,
      text: changedTodo.text,
    })) as Todo;
    expect(todo).toMatchObject(changedTodo);

    // Update instance to restore database
    todo.text = initialTodo.text;
    todo.save();
  });

  test('returns error when no data found', async () => {
    const error = await todoAPI.changeTodoText({
      id: 'not-a-uuid',
      text: 'Test changeTodoText',
    });
    expect(error).toBeInstanceOf(Error);
  });
});

describe('changeTodoIsComplete', () => {
  test('returns changed todo when successful', async () => {
    const changedTodo = {
      ...initialTodo,
      isComplete: true,
    };
    const todo = (await todoAPI.changeTodoIsComplete({
      id: changedTodo.id,
      isComplete: changedTodo.isComplete,
    })) as Todo;
    expect(todo).toMatchObject(changedTodo);

    // Update instance to restore database
    todo.isComplete = initialTodo.isComplete;
    todo.save();
  });

  test('returns error when no data found', async () => {
    const error = await todoAPI.changeTodoIsComplete({
      id: 'not-a-uuid',
      isComplete: true,
    });
    expect(error).toBeInstanceOf(Error);
  });
});

describe('changeTodoIsArchived', () => {
  test('returns changed todo when successful', async () => {
    const changedTodo = {
      ...initialTodo,
      isArchived: true,
    };
    const todo = (await todoAPI.changeTodoIsArchived({
      id: changedTodo.id,
      isArchived: changedTodo.isArchived,
    })) as Todo;
    expect(todo).toMatchObject(changedTodo);

    // Update instance to restore database
    todo.isArchived = initialTodo.isArchived;
    todo.save();
  });

  test('returns error when no data found', async () => {
    const error = await todoAPI.changeTodoIsArchived({
      id: 'not-a-uuid',
      isArchived: true,
    });
    expect(error).toBeInstanceOf(Error);
  });
});

export {};
