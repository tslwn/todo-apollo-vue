import { Model, Optional } from 'sequelize';

export interface TodoAttributes {
  id: string;
  text: string;
  isComplete: boolean;
  isArchived: boolean;
}

export type TodoCreationAttributes = Optional<TodoAttributes, 'id'>;

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes {
  public id!: string;
  public text!: string;
  public isComplete!: boolean;
  public isArchived!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
