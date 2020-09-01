import { DataSource } from 'apollo-datasource';
import { Sequelize } from 'sequelize';

class TodoAPI extends DataSource {
  public sequelize: Sequelize;
  public context: any;

  constructor({ sequelize }: { sequelize: Sequelize }) {
    super();
    this.sequelize = sequelize;
  }

  initialize(config: any) {
    this.context = config.context;
  }

  async getAllTodos() {
    try {
      const todos = await this.sequelize.models.Todo.findAll();
      return todos;
    } catch (err) {
      return new Error(err);
    }
  }

  async getTodoById({ id }) {
    try {
      const todos = await this.sequelize.models.Todo.findAll({
        where: {
          id,
        },
      });
      // findAll returns an Array of Todo objects
      return todos && todos[0] ? todos[0] : null;
    } catch (err) {
      return new Error(err);
    }
  }

  async addTodo({ text }) {
    try {
      const todo = await this.sequelize.models.Todo.create({
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
  returnRowOrThrow(countAffected, rowsAffected) {
    switch (countAffected) {
    case 1:
      return rowsAffected[0];
    case 0:
      return new Error('No data found');
    default:
      return new Error('Too many rows');
    }
  }

  async changeTodoText({ id, text }) {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.sequelize.models.Todo.update(
        { text },
        { returning: true, where: { id } }
      );
      this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsComplete({ id, isComplete }) {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.sequelize.models.Todo.update(
        { isComplete },
        { returning: true, where: { id } }
      );
      this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }

  async changeTodoIsArchived({ id, isArchived }) {
    try {
      const [
        countAffected,
        rowsAffected,
      ] = await this.sequelize.models.Todo.update(
        { isArchived },
        { returning: true, where: { id } }
      );
      this.returnRowOrThrow(countAffected, rowsAffected);
    } catch (err) {
      return new Error(err);
    }
  }
}

export default TodoAPI;
