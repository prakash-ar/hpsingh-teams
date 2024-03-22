import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './CustomerController';
import { CustomerService } from './CustomerService';
import { CustomerOtp } from '@model/CustomerOtpModel';
import { TokenModule } from '@module/Token/TokenModule';



@Module({
  imports: [SequelizeModule.forFeature([CustomerOtp]), forwardRef(() => TokenModule)],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule { }