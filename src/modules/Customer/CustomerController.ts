import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './CustomerService';
import { Role as AuthRoles } from '@shared/constants/global.constants';
import { Roles } from '@module/Auth/RolesDecorator';
import { GenetateOtpDto, OtpResponseDto } from '@module/Auth/AuthDto';
import { SmsService } from 'src/providers/SmsProvider/SmsService';
import { CustomerCreateDto } from './dto/SaveCustomerDto';
import { CustomerDto } from './dto/CustomerDto';

@ApiTags('Customer')
@ApiBearerAuth('JWT-auth')
@Controller('/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Roles(AuthRoles.Admin, AuthRoles.Sales, AuthRoles.Supervisor)
  @Post('generate-otp')
  public async generateOtp(@Body() genetateOtpDto: GenetateOtpDto): Promise<OtpResponseDto> {
    return this.customerService.generateOtp(genetateOtpDto.phone)
  }

  @Roles(AuthRoles.Admin, AuthRoles.Sales, AuthRoles.Supervisor)
  @Post('save-customer')
  public async verfiyOtpAndSaveCustomer(@Body() customer: CustomerCreateDto): Promise<CustomerDto> {
    await this.customerService.verifyOtp(customer.phone, customer.otp)
    return await this.customerService.saveCustomer(customer)
  }

}
