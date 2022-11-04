import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find(
      { relations: ['address', 'user', 'order_detail'] }
    );
  }

  findAllByUserId(idUser: number) {
    return this.orderRepository.find(
      {
        where: {
          user: {
            id_user: idUser
          }
        },
        relations: ['address', 'order_detail']
      }
    );
  }

  findAllByUserByStatus(idUser: number, status: string) {
    return this.orderRepository.find(
      {
        where: {
          user: {
            id_user: idUser
          },
          status: status
        },
        relations: ['address', 'order_detail']
      }
    );
  }

  findAllByStatus(status: string) {
    return this.orderRepository.find(
      {
        where: {
          status: status
        },
        relations: ['address', 'order_detail', 'user']
      }
    );
  }

  findOne(id_order: number) {
    return this.orderRepository.findOne(
      {
        where: { id_order },
        relations: ['address', 'user', 'order_detail', 'order_detail.product'],
        withDeleted: true 
      });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto)
  }

  async remove(id: number) {
    const deleteResponse = await this.orderRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }
  }
}
