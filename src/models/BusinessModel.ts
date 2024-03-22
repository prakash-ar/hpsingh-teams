import { DataType, Column, CreatedAt, HasMany, Model, Table, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { User } from './UserModel';
import { UserRole } from './UserRoleModel';
import { UserBusiness } from './UserBusinessModel';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class Business extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  phone: string

  @Column
  address: string;

  @Column
  status: boolean

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => User, {
    through: { model: () => UserBusiness },
  })
  user: User[]
}