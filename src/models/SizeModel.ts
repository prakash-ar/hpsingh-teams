import { DataType, Column, CreatedAt, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table, UpdatedAt, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Product } from './ProductModel';
import { ProductSize } from './ProductsSizeModel';

const {STRING, TEXT, INTEGER, BIGINT} = DataType;
@Table({ timestamps:true})
export class Size extends Model {
 
  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  
  @Column
  name: string;
  
  @Column({
    type:TEXT
  })
  code: string;

  @BelongsToMany(() => Product, () => ProductSize)
  products: Product[];
  
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}