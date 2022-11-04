import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductType } from 'src/product-type/entities/product-type.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductType, OrderDetail])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
