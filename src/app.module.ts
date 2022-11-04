import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Role } from './role/entities/role.entity';
import { RoleModule } from './role/role.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bs-api',
      entities: ['dist/**/**.entity{.ts,.js}'],
      //entities: [Role,User],//not work in web app
      synchronize: true,
    }),
    RoleModule,
    UsersModule,
    AuthModule,
    AddressModule,
    ProductTypeModule,
    ProductModule,
    OrderModule,
    OrderDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
