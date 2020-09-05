import { Sequelize, DataTypes } from 'sequelize/types';
import { Todo } from '../types/todo.types';

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const TodoModel = sequelize.define<Todo>('Todo', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: dataTypes.STRING,
      allowNull: false
    },
    isComplete: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    },
    isArchived: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return TodoModel;
};
