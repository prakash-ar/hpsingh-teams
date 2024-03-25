import { DataType, Column, CreatedAt, HasMany, Model, Table, UpdatedAt, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { User } from './UserModel';
import { UserRole } from './UserRoleModel';
import { UserBusiness } from './UserBusinessModel';
import { Business } from './BusinessModel';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class Token extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  token: string;

  @Column
  customerId: string

  @Column
  customerName: string

  @Column
  customerPhone: string

  @Column({
    type: BIGINT.UNSIGNED,
  })
  businessId: number;

  @Column
  status: boolean

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Business, {
    foreignKey: { name: 'businessId' },
    onDelete: 'CASCADE',
  })
  business: Business
}