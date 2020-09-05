import { DataSource } from 'apollo-datasource';
import { Sequelize, OrderItem, ModelCtor } from 'sequelize';

import { Todo } from '../types/todo.types';
import {
  TodosInput,
  AddTodoInput,
  ChangeTodoTextInput,
  ChangeTodoIsCompleteInput,
  ChangeTodoIsArchivedInput
} from 'schema';

class TodoAPI extends DataSource {
  public model: ModelCtor<Todo>;
  public context!: any;

  constructor({ sequelize }: { sequelize: Sequelize }) {
    super();
    this.model = sequelize.models['Todo'] as ModelCtor<Todo>;
  }

  initialize(config: any): void {
    this.context = config.context;
  }

  async getAllTodos({ filter, orderBy }: TodosInput): Promise<Todo[] | Error> {
    try {
      const order = orderBy
        ? (Object.keys(orderBy).map(key => [key, orderBy[key]]) as OrderItem[])
        : undefined;

      const todos = await this.model.findAll({ order, where: filter });
      return todos;
    } catch (err) {
      return new Error(err);
    }
  }

  async getTodoById({ id }: { id: Todo['id'] }): Promise<Todo | Error> {
    try {
      const todo = await this.model.findByPk(id);
      if (todo === null) {
        return new Error('No todo found');
      }
      return todo;
    } catch (err) {
      return new Error(err);
    }
  }

  async addTodo({ text }: AddTodoInput): Promise<Todo | Error> {
    try {
      const todo = await this.model.create({
        text,
        isComplete: false,
        isArchived: false
      });
      return todo;
    } catch (err) {
      return new Error(err);
    }
  }

  // TODO: move to utilities
  returnRowOrThrow<T>(countAffected: number, rowsAffected: T[]): T | Error {
    switch (countAffected) {
      case 1:
        return rowsAffected[0];
      case 0:
        return new Error('No data found');
      default:
        return new Error('Too many rows');
    }
  }

  async changeTodoText({
    id,
    text
  }: ChangeTodoTextInput): Promise<Todo | Error> {
    try {
      const [countAffected, rowsAffected] = await this.model.update(
        { text },
        { returning: true, where: { id } }
      );
      return this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsComplete({
    id,
    isComplete
  }: ChangeTodoIsCompleteInput): Promise<Todo | Error> {
    try {
      const [countAffected, rowsAffected] = await this.model.update(
        { isComplete },
        { returning: true, where: { id } }
      );
      return this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsArchived({
    id,
    isArchived
  }: ChangeTodoIsArchivedInput): Promise<Todo | Error> {
    try {
      const [countAffected, rowsAffected] = await this.model.update(
        { isArchived },
        { returning: true, where: { id } }
      );
      return this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }
}

export default TodoAPI;
