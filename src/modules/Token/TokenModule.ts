import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenController } from './TokenController';
import { TokenService } from './TokenService';
import { Token } from '@model/TokenModel';
import { AuditLogModule } from '@module/Audit/AuditLogModule';
import { CustomerModule } from '@module/Customer/CustomerModule';

@Module({
  imports: [SequelizeModule.forFeature([Token]), CustomerModule],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule { }