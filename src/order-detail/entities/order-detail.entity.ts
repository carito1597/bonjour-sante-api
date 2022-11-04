import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_detail')
export class OrderDetail {
	@PrimaryGeneratedColumn()
	id_order_detail: number;

	@Column({ type: "int", nullable: false })
	quantity: number;

	@Column({ type: "decimal", precision: 10, scale: 1, nullable: false })
	price: Date;

	@ManyToOne(() => Order, (order: Order) => order.order_detail)
	order: Order;

	@ManyToOne(() => Product, (product: Product) => product.order_detail)
	product: Product;

}
