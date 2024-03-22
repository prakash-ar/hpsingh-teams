import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditLogService } from './AuditLogService';
import { Audit } from '@model/AuditModel';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Audit])],
  providers: [AuditLogService],
  exports: [AuditLogService],
})
export class AuditLogModule { }
