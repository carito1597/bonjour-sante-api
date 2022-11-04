import { IsNotEmpty } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateAddressDto {
	@IsNotEmpty()
	name: string;

	description: string;

	latitude: string;

	longitude: string;

	user: User;
}
