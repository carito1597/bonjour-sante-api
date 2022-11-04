import { Product } from "src/product/entities/product.entity";
import { ProductService } from "src/product/product.service";
import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_product_type: number;
  
	@Column({type: "varchar", length: 50,unique: true})
	name: string;

	@ManyToMany(()=> Product, (product)=> product.products_types)
	products: Product[];

	@DeleteDateColumn()
	public deletedAt: Date;

}
