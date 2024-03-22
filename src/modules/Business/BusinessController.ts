import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Business } from '@model/BusinessModel';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BusinessService } from './BusinessService';
import { BusinessCreateDto } from './dto/BusinessDto';
import { Role as AuthRoles } from '@shared/constants/global.constants';
import { Roles } from '@module/Auth/RolesDecorator';

@ApiTags('business')
@ApiBearerAuth('JWT-auth')
@Controller('/business')
export class BusinessController {
  constructor(private businessService: BusinessService) { }

  @Roles(AuthRoles.Admin)
  @Get()
  async getAll(): Promise<Business[]> {
    return this.businessService.findAll();
  }

  @Roles(AuthRoles.Admin)
  @Post()
  async createBusiness(@Body() data: BusinessCreateDto): Promise<BusinessCreateDto> {
    return this.businessService.createBusiness(data);
  }

}
