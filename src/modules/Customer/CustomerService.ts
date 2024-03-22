import { CustomerOtp } from '@model/CustomerOtpModel';
import { AuditLogService } from '@module/Audit/AuditLogService';
import { OtpResponseDto } from '@module/Auth/AuthDto';
import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SmsService } from 'src/providers/SmsProvider/SmsService';
import { CustomerCreateDto } from './dto/SaveCustomerDto';
import { TokenService } from '@module/Token/TokenService';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerOtp)
    private customerOtpModel: typeof CustomerOtp,
    private readonly smsService: SmsService,
    private readonly auditLogService: AuditLogService,
    private readonly tokenService: TokenService
  ) { }

  async generateOtp(mobile: number | string): Promise<OtpResponseDto> {
    this.customerOtpModel.destroy({ where: { phone: mobile } })
    const userOtpValues = {
      otp: Math.floor(Math.random() * 1000000),
      phone: mobile
    }
    return await this.customerOtpModel.create(userOtpValues).then(async (res) => {
      await this.smsService.sendSms(mobile, "Your verfication code is ")

      return { otp: userOtpValues.otp, status: 'success' }
    }).catch(() => {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    })

  }
  async verifyOtp(phone: string, otp: number): Promise<boolean> {
    const customerOtp = await this.customerOtpModel.findOne({ where: { phone } })
    if (customerOtp == null) {
      throw new NotFoundException('Mobile number not found!');
    }
    if (customerOtp.otp !== otp) {
      throw new NotAcceptableException('Otp does not match!');
    }
    // this.customerOtpModel.destroy({ where: { phone } })
    return true
  }

  async saveCustomer(customer: CustomerCreateDto): Promise<any> {
    if (customer.customerId) {
      await this.tokenService.activateToken(customer)
    } else {
      //Save in marg api and get the details 
      const customerId = (Math.random() * 1000000).toString()
      let customerData = { ...customer, customerId }
      await this.tokenService.activateToken(customerData)
      return customerData

    }
  }
}