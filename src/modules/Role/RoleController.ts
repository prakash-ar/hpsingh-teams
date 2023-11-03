import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@model/RoleModel';
import { ApiTags } from '@nestjs/swagger';

// import { JwtAuthGuard } from '../auth/auth.jwt.guard';

import { RoleService } from './RoleService';
import { RoleCreateDto } from './dto/RoleDto';

@ApiTags('role')
@Controller('/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post('role')
  async createRole( @Body() data:RoleCreateDto): Promise<RoleCreateDto> {
    return this.roleService.createRole(data);
  }
  // @Post('role')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string; password: string },
  // ): Promise<Role> {
  //   return this.userService.createUser(userData);
  // }
}
