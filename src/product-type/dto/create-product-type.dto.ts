import { IsNotEmpty } from "class-validator";

export class CreateProductTypeDto {
	@IsNotEmpty()
	name: string;
}
