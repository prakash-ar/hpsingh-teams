import { DataType, Column, CreatedAt, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './UserModel';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class Role extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @HasMany(() => User, 'roleId')
  users: User[]

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}