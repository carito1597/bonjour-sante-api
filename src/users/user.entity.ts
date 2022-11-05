
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_user: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@ManyToOne(() => Role, role => role.id_role)
	@JoinColumn({ name: 'id_role' })
	role: Role;

	@Column({ type: "varchar", length: 10})
	phone: string;

	@Column({ type: "varchar", length: 70})
	fullName: string;

	@OneToMany(() => Address, address => address.user)
	addresses: Address[];//

	@OneToMany(() => Order, (order: Order) => order.user)
	order: Order[];

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 8);
	}

	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	@DeleteDateColumn()
	public deletedAt: Date;
}