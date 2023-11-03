import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './RoleController';
import { RoleService } from './RoleService';
import { UserListener } from './RoleListener'
import { Role } from '@model/RoleModel';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RoleService, UserListener],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule { }