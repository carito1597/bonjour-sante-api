import { IsNotEmpty, IsString } from "class-validator";
import { ProductType } from "src/product-type/entities/product-type.entity";

export class CreateProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	price: number;

	@IsString()
	url_image: string;

	products_types: ProductType[];
}
