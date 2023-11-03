import { DataType, Column, CreatedAt, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table, UpdatedAt, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Category } from './CategoryModel';
import { Attribute } from './AttributeModel';
import { Color } from './ColorModel';
import { Size } from './SizeModel';
import { ProductColor } from './ProductColorModel';
import { ProductSize } from './ProductsSizeModel';

const { STRING, TEXT, BIGINT } = DataType;
@Table({ timestamps: true })
export class Product extends Model {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  title: string;

  @Column
  sku: string;

  @Column({
    type: TEXT
  })
  shortDescription: string;

  @Column({
    type: TEXT
  })
  description: string;

  @Column
  imagePath: string;

  @Column({
    type: STRING(500)
  })
  gallery: string;

  @Column({
    type: BIGINT.UNSIGNED
  })
  @ForeignKey(() => Category)
  categoryId: number

  @HasMany(() => Attribute, 'productId')
  attributes: Attribute[]

  @BelongsTo(() => Category, 'categoryId')
  category: Category

  @BelongsToMany(() => Color, () => ProductColor)
  color: Color[];

  @BelongsToMany(() => Size, () => ProductSize)
  size: Size[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}