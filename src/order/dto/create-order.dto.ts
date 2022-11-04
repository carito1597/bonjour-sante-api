import { Address } from "src/address/entities/address.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/users/user.entity";

export class CreateOrderDto {
	total: number;

	date: Date;

	status: string;

	payment_method: string;

	delivery_method: string;

	user: User;

	address: Address;

	order_detail: OrderDetail[];
}
