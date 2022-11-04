import { Order } from "src/order/entities/order.entity";
import { User } from "src/users/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {
	@PrimaryGeneratedColumn()
	id_address: number;

	@Column({ type: 'varchar', length: 50, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 300, nullable: false })
	description: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	latitude: string;

	@Column({ type: 'varchar', length: 25, nullable: true })
	longitude: string;

	@ManyToOne(() => User, user => user.addresses)
	@JoinColumn({ name: 'id_user' })
	user: User;

	@OneToMany(() => Order, (order: Order) => order.address)
	order: Order[];

	@DeleteDateColumn()
	public deletedAt: Date;
}
