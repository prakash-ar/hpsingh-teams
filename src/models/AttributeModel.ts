import { DataType, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { Product } from './ProductModel';

const { TEXT, BIGINT } = DataType;
@Table({ timestamps: true })
export class Attribute extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  key: string;

  @Column({
    type: TEXT
  })
  value: string;

  @ForeignKey(() => Product)
  productId: string

  @BelongsTo(() => Product, 'productId')
  product: Product

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}