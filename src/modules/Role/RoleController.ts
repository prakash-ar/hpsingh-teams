import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@model/RoleModel';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './RoleService';
import { RoleCreateDto } from './dto/RoleDto';
import { Role as AuthRoles } from '@shared/constants/global.constants';
import { Roles } from '@module/Auth/RolesDecorator';

@ApiTags('role')
@ApiBearerAuth('JWT-auth')
@Controller('/roles')
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Roles(AuthRoles.Admin)
  @Get()
  async getAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Roles(AuthRoles.Admin)
  @Post('role')
  async createRole(@Body() data: RoleCreateDto): Promise<RoleCreateDto> {
    return this.roleService.createRole(data);
  }

}
