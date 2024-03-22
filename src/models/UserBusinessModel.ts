import { DataType, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './RoleModel';
import { User } from './UserModel';
import { Business } from './BusinessModel';


const { BIGINT } = DataType;
@Table({ timestamps: false })
export class UserBusiness extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string

  @Column({
    type: BIGINT.UNSIGNED,
  })
  @ForeignKey(() => Business)
  businessId: number
}