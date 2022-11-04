import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id, { relations: ['role', 'addresses'] });
  }

  //find by rol
  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAddressByIdUser(id: number) {
    const user = await this.findById(id);
    return user.addresses;
  }

  // async remove(id: number) {
  //   const deleteResponse = await User.softRemove(id);
  //   if (!deleteResponse.) {
  //     throw new NotFoundException(id);
  //   }
  // }
}