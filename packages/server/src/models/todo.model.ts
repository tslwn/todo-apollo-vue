import { Sequelize } from 'sequelize/types';
import { Todo } from '../types/todo.types';

module.exports = (sequelize: Sequelize, DataTypes) => {
  const TodoModel = sequelize.define<Todo>('Todo', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isComplete:  {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isArchived:  {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }
  );
  return TodoModel;
};
