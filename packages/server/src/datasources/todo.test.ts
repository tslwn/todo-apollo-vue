import sequelize from '../models';
import { Sort } from '../schema';
import { Todo } from 'types/todo.types';
import TodoAPI from './todo.datasource';

const todoAPI = new TodoAPI({ sequelize });

test('model is defined', () => {
  expect(todoAPI.model).toBeDefined();
});

test('getAllTodos returns four todos with no filter', async () => {
  const data = (await todoAPI.getAllTodos({})) as Todo[];
  expect(data.length).toBe(4);
});

test('getAllTodos returns two todos with filter isComplete', async () => {
  const data = (await todoAPI.getAllTodos({
    filter: { isComplete: true }
  })) as Todo[];
  expect(data.length).toBe(2);
});

test('getAllTodos returns todos in order', async () => {
  const data = (await todoAPI.getAllTodos({
    orderBy: { createdAt: Sort.Desc }
  })) as Todo[];
  const sortedData = data.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  expect(data).toEqual(sortedData);
});

test('getTodoById returns todo', async () => {
  const data = (await todoAPI.getTodoById({ id: 1 })) as Todo;
  expect(data.text).toBe('Buy milk');
});

test('getTodoById returns error when no data found', async () => {
  const data = (await todoAPI.getTodoById({ id: -1 })) as Todo;
  expect(data).toBeInstanceOf(Error);
});

test('addTodo returns todo', async () => {
  /**
   * autoIncrement is true for the Todo model id field, so after the todos seed
   * runs the next value is 5.
   */
  const todo = {
    id: 5,
    text: 'Test addTodo',
    isComplete: false,
    isArchived: false
  };
  const data = (await todoAPI.addTodo({ text: todo.text })) as Todo;

  // Todo instance has other fields
  expect(data).toMatchObject(todo);
});

test('changeTodoText returns todo', async () => {
  const args = {
    id: 5,
    text: 'Test changeTodoText'
  };
  const data = (await todoAPI.changeTodoText({ ...args })) as Todo;
  expect(data).toMatchObject(args);
});

test('changeTodoText returns error when no data found', async () => {
  const args = {
    id: -1,
    text: 'Test changeTodoText'
  };
  const data = await todoAPI.changeTodoText({ ...args });
  expect(data).toBeInstanceOf(Error);
});

test('changeTodoIsComplete returns todo', async () => {
  const args = {
    id: 5,
    isComplete: true
  };
  const data = (await todoAPI.changeTodoIsComplete({ ...args })) as Todo;
  expect(data).toMatchObject(args);
});

test('changeTodoIsComplete returns error when no data found', async () => {
  const args = {
    id: -1,
    isComplete: true
  };
  const data = await todoAPI.changeTodoIsComplete({ ...args });
  expect(data).toBeInstanceOf(Error);
});

test('changeTodoIsArchived returns todo', async () => {
  const args = {
    id: 5,
    isArchived: true
  };
  const data = (await todoAPI.changeTodoIsArchived({ ...args })) as Todo;
  expect(data).toMatchObject(args);
});

test('changeTodoIsArchived returns error when no data found', async () => {
  const args = {
    id: -1,
    isArchived: true
  };
  const data = await todoAPI.changeTodoIsArchived({ ...args });
  expect(data).toBeInstanceOf(Error);
});

export {};
