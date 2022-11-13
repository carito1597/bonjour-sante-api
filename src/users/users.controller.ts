
import { Controller, Get, Post, Body, Param, Req, UseGuards, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Get('')
  showAll() {
    return this.usersService.getUsers();
  }

  @Get('addresses/:id')
  findAddresses(@Param('id') id: string) {
    return this.usersService.findAddressByIdUser(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}