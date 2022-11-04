import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";

export class CreateOrderDetailDto {
	quantity: number;

	price: Date;

	order: Order;

	product: Product;
}
