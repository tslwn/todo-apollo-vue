import { Sequelize, Model, DataTypes } from 'sequelize';

import database from '../sequelize.config';

const env = process.env.NODE_ENV || 'development';
const config = database[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// attributes in the model
interface TodoAttributes {
  text: string;
  isComplete: boolean;
  isArchived: boolean;
}

class Todo
  extends Model<TodoAttributes, TodoAttributes>
  implements TodoAttributes {
  public text!: string;
  public isComplete!: boolean;
  public isArchived!: boolean;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    text: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'Todo',
  }
);

const db = {
  Todo: Todo,
  sequelize,
  Sequelize,
};

export default db;
