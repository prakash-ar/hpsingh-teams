import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BusinessController } from './BusinessController';
import { BusinessService } from './BusinessService';
import { Business } from '@model/BusinessModel';

@Module({
  imports: [SequelizeModule.forFeature([Business])],
  providers: [BusinessService],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule { }