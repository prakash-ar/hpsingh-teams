import { DataType, Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Role } from './RoleModel';
import { User } from './UserModel';


const { BIGINT } = DataType;
@Table({ timestamps: false })
export class UserOtp extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string

  @Column
  otp: number

  @Column
  expireIn: Date

  @BelongsTo(() => User, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  user: User
}