import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { ProductType } from './entities/product-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType, Product])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService]
})
export class ProductTypeModule {}
