import { DataType, Column, CreatedAt, HasMany, Model, Table, UpdatedAt, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './UserModel';
import { UserRole } from './UserRoleModel';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class Audit extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  action: string;

  @Column
  details: string;

  @Column
  module: string;

  @CreatedAt
  createdAt: Date;

  @BelongsTo(() => User, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  user: User[]
}