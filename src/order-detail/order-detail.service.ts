import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    return await this.orderDetailRepository.save(createOrderDetailDto);
  }

  findAll() {
    return this.orderDetailRepository.find({relations: ['product']});
  }

  findOne(id_order_detail: number) {
    return this.orderDetailRepository.findOne(
      {
        where: { id_order_detail },
        relations: ['product']
      });
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailRepository.update(id,updateOrderDetailDto)
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
