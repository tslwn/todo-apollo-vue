import { DataSource } from 'apollo-datasource';
import { Sequelize, OrderItem, ModelCtor } from 'sequelize';

import { Todo } from '../types/todo.types';
import { TodoFilterInput, TodoOrderByInput } from 'schema';

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

  async getAllTodos({ filter, orderBy }: { filter: TodoFilterInput, orderBy: TodoOrderByInput }): Promise<Todo[] | Error> {
    try {
      const order = Object.keys(orderBy).map(key => [key, orderBy[key]]) as OrderItem[];
      
      const todos = await this.model.findAll({ order, where: filter });
      return todos;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  async getTodoById({ id }: { id: Todo['id'] }): Promise<Todo | Error> {
    try {
      const todos = await this.model.findAll({
        where: {
          id,
        },
      });
      // findAll returns an Array of Todo objects
      return todos[0];
    } catch (err) {
      return new Error(err);
    }
  }

  async addTodo({ text }: { text: Todo['text'] }): Promise<Todo | Error> {
    try {
      const todo = await this.model.create({
        text,
        isComplete: false,
        isArchived: false,
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

  async changeTodoText({ id, text }: Pick<Todo, 'id' | 'text'>): Promise<Todo | Error> {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.model.update(
        { text },
        { returning: true, where: { id } }
      );
      return this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsComplete({ id, isComplete }: Pick<Todo, 'id' | 'isComplete'>): Promise<Todo | Error> {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.model.update(
        { isComplete },
        { returning: true, where: { id } }
      );
      return this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsArchived({ id, isArchived }: Pick<Todo, 'id' | 'isArchived'>): Promise<Todo | Error> {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.model.update(
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
