import { BeforeCreate, BeforeUpdate, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Role } from './RoleModel';

import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { UserRole } from './UserRoleModel';
import { UserOtp } from './UserOtpModel';
import { UserBusiness } from './UserBusinessModel';
import { Business } from './BusinessModel';
import { Audit } from './AuditModel';

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

  @Column({ defaultValue: true })
  isMobileAccessOnly: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => UserOtp, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  userOtp: UserOtp

  @HasMany(() => UserRole, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  userRoles: UserRole[]

  @HasMany(() => Audit, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  audit: Audit[]

  @HasMany(() => UserBusiness, {
    foreignKey: { name: 'userId' },
    onDelete: 'CASCADE',
  })
  userBusiness: UserBusiness[]


  @BelongsToMany(() => Role, {
    through: { model: () => UserRole },
  })
  roles: Role[]


  @BelongsToMany(() => Business, {
    through: { model: () => UserBusiness },
  })
  business: Business[]

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.password) {
      const encryptedPass: any = await AuthHelpers.hash(user.password);
      user.password = encryptedPass
    }
  }
}
