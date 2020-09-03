import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

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
export interface TodoAttributes {
  id: number;
  text: string;
  isComplete: boolean;
  isArchived: boolean;
}

type TodoCreationAttributes = Optional<TodoAttributes, 'id'>

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes {
  public id!: number;
  public text!: string;
  public isComplete!: boolean;
  public isArchived!: boolean;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
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
