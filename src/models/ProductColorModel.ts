import { DataType, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './ProductModel';
import { Color } from './ColorModel';

const { BIGINT} = DataType;
@Table({ timestamps:false})
export class ProductColor extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: string

  @Column({
    type: BIGINT.UNSIGNED,
  })
  @ForeignKey(() => Color)
  colorId: number
}