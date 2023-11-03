import { DataType, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './ProductModel';
import { Size } from './SizeModel';

const {BIGINT} = DataType;
@Table({ timestamps:false})
export class ProductSize extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: string

  @Column({
    type: BIGINT.UNSIGNED,
  })
  @ForeignKey(() => Size)
  colorId: number
}