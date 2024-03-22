import { DataType, Column, CreatedAt, Model, Table } from 'sequelize-typescript';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class CustomerOtp extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  otp: number;

  @Column
  phone: string;

  @CreatedAt
  createdAt: Date;


}