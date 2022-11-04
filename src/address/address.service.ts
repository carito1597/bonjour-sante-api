import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address)private addressRepository:Repository<Address>)
  {}

  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto as any);
    return await this.addressRepository.save(address);
  }

  async findAll() {
    return this.addressRepository.find({relations: ['user']});
  }

  async findOne(id: number) {
    return this.addressRepository.findOne(id,{relations: ['user']});
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(id,updateAddressDto)
  }

  async remove(id: number) {
    const deleteResponse = await this.addressRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }
  }
}
