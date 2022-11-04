import { Address } from "src/address/entities/address.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/users/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn()
	id_order: number;

	@Column({ type: "decimal", precision: 10, scale: 1, default: 0 })
	total: number;

	@Column({ nullable: false })
	date: Date;

	@Column({ type: 'varchar', length: 25, default: 'Pendiente' })
	status: string;

	@Column({ type: 'varchar', length: 50})
	payment_method: string;

	@Column({ type: 'varchar', length: 50})
	delivery_method: string;

	@OneToMany(() => OrderDetail, (order_detail) => order_detail.order)
	order_detail: OrderDetail[];

	@ManyToOne(() => User, (user: User) => user.order)
	user: User;

	@ManyToOne(() => Address, (address: Address) => address.order)
	address: Address;

	@DeleteDateColumn()
	public deletedAt: Date;
}
