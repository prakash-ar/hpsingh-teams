import { DataType, Column, CreatedAt, Model, Table, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { Product } from './ProductModel';
import { ProductColor } from './ProductColorModel';

const { STRING, TEXT, INTEGER, BIGINT } = DataType;
@Table({ timestamps: true })
export class Color extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column({
    type: TEXT
  })
  code: string;

  @BelongsToMany(() => Product, () => ProductColor)
  products: Product[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
