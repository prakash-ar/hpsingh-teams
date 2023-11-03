import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GLOBAL_CONFIG } from './configs/global.config';
import { LoggerModule } from '@module/Logger/LoggerModule';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { UserModule } from '@module/User/UserModule';
import { RoleModule } from '@module/Role/RoleModule';
import { AuthModule } from '@module/Auth/AuthModule';
import { Category } from '@model/CategoryModel';
import { Color } from '@model/ColorModel';
import { Size } from '@model/SizeModel';
import { Product } from '@model/ProductModel';
import { Attribute } from '@model/AttributeModel';
import { ProductColor } from '@model/ProductColorModel';
import { ProductSize } from '@model/ProductsSizeModel'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
      models: [Category, Attribute, Product, Color, Size, ProductColor, ProductSize]
    }),
    LoggerModule,
    UserModule,
    RoleModule,
    AuthModule
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
