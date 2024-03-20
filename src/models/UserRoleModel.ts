import { DataType, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './RoleModel';
import { User } from './UserModel';


const { BIGINT } = DataType;
@Table({ timestamps: false })
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string

  @Column({
    type: BIGINT.UNSIGNED,
  })
  @ForeignKey(() => Role)
  roleId: number
}