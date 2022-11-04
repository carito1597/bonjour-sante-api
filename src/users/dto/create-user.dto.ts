
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;

  address: Address[];
}