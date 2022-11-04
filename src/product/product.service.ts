import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/entities/product-type.entity';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const newProduct = new Product();
    newProduct.name = createProductDto.name;
    newProduct.description = createProductDto.description;
    newProduct.price = createProductDto.price;
    newProduct.url_image = createProductDto.url_image;
    const products_types_ids = createProductDto.products_types;
    const products_types = await this.productTypeRepository.findByIds(products_types_ids);
    newProduct.products_types = products_types;
    // const product = this.productRepository.create(createProductDto as any);
    return await this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find({ relations: ['products_types'] });
  }

  findOne(id_product: number) {
    return this.productRepository.findOne(
      id_product,
      {
        relations: ['products_types'],
      }
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    let product = new Product();
    product.id_product = id;
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.url_image = updateProductDto.url_image
    product.products_types = updateProductDto.products_types;
    return this.productRepository.save(product)
  }

  async remove(id: number) {
    const deleteResponse = await this.productRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }
  }
}
