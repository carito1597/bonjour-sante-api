import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

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

  getUsers() {
    return User.find({
      relations: ['role'],
      select: ['id_user', 'email', 'role', 'phone']
        // id_user: true,
        // email: true
      
    });
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

  async remove(id: number) {
    const deleteResponse = this.userRepository.softDelete(id);
    if (!(await deleteResponse).affected) {
      throw new NotFoundException(id);
    }
  }

}