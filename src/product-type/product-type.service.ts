import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  constructor(@InjectRepository(ProductType)private productTypeRepository:Repository<ProductType>)
  {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    const productType = this.productTypeRepository.create(createProductTypeDto as any);
    return  await this.productTypeRepository.save(productType);
  }

  findAll() {
    return this.productTypeRepository.find({relations: ['products']});
  }

  findOnlyProductType() {
    return this.productTypeRepository.find();
  }

  findOne(id: number) {
    return this.productTypeRepository.findOne(id,{relations: ['products']});
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeRepository.update(id, updateProductTypeDto);
  }

  async remove(id: number) {
    const deleteResponse = await this.productTypeRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }
  }
}
