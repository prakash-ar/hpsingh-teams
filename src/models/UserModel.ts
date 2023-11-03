import { BeforeCreate, BeforeUpdate, BelongsTo, Column, CreatedAt, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Role } from './RoleModel';

import { AuthHelpers } from '@shared/helpers/auth.helpers';

const { BIGINT } = DataType;
@Table({
  timestamps: true
})
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    type: BIGINT.UNSIGNED
  })
  mobile: number

  @Column({ unique: true })
  email: string

  @Column
  password: string

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({
    type: BIGINT.UNSIGNED,
  })
  @ForeignKey(() => Role)
  roleId: number

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Role, 'roleId')
  role:  Role

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.password) {
      const encryptedPass:any = await AuthHelpers.hash(user.password);
      user.password = encryptedPass
    }
  }
}
