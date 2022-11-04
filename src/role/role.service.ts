import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto as any);
    return await this.roleRepository.save(role);
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findByRolIdByName(name: string) {
    return this.roleRepository.findOne(
      { where: { role_name: name } }
    );
  }

  async findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto)
  }

  async remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
