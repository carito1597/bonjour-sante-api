import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import {
	BaseEntity,
	Column,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_product: number;

	@Column({ type: "varchar", length: 100, unique: true })
	name: string;

	@Column({ type: "varchar", length: 255 })
	description: string;

	@Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
	price: number;

	@Column({ type: "varchar", length: 255 })
	url_image: string;

	@OneToMany(() => OrderDetail, (orderDetail: OrderDetail) =>orderDetail.product)
    order_detail: OrderDetail[];

	@ManyToMany(() => ProductType, (product_type) => product_type.products, { eager: true, cascade: ['update'] })
	@JoinTable({
		name: 'products/types',
		joinColumn: {
			name: 'id_product'
		},
		inverseJoinColumn: {
			name: 'id_product_type'
		}
	})
	products_types: ProductType[];

	@DeleteDateColumn()
	public deletedAt: Date;
}
