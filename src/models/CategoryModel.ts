import { DataType, Column, CreatedAt, ForeignKey, HasMany, Model, Table, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { Product } from './ProductModel';

const { BIGINT } = DataType;
@Table({ timestamps: true })
export class Category extends Model {

  @Column({
    type: BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  imagePath: string;

  @ForeignKey(() => Category)
  parentId: number

  @HasMany(() => Category, 'parentId')
  childern: Category[]

  @HasMany(() => Category, 'categoryId')
  products: Product[]

  @BelongsTo(() => Category, 'parentId')
  parent: Category

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}