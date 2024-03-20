import { DataType, Column, CreatedAt, HasMany, Model, Table, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { User } from './UserModel';
import { UserRole } from './UserRoleModel';

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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => User, {
    through: { model: () => UserRole },
  })
  user: User[]
}