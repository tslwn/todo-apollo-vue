import { Sequelize, DataTypes } from 'sequelize/types';
import { Todo } from '../types/todo.types';

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const TodoModel = sequelize.define<Todo>('Todo', {
    id: {
      allowNull: false,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
      type: dataTypes.UUID,
    },
    text: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    isComplete: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
    isArchived: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
  });
  return TodoModel;
};
