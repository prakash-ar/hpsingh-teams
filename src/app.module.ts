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
import { Role } from '@model/RoleModel';
import { User } from '@model/UserModel';
import { UserRole } from '@model/UserRoleModel';
import { RolesGuard } from '@module/Auth/RoleGuard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@module/Auth/AuthGuard';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, UserRole]
    }),
    AuthModule,
    RoleModule,
    UserModule,
    LoggerModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Set AuthGuard as a global guard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Set AuthGuard as a global guard
    },
    // You can still provide RolesGuard as a regular provider
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
