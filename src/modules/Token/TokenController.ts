import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Token } from '@model/TokenModel';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenService } from './TokenService';
import { TokenCreateDto } from './dto/TokenCreateDto';
import { Role as AuthRoles } from '@shared/constants/global.constants';
import { Roles } from '@module/Auth/RolesDecorator';
import { TokenDto } from './dto/TokenDto';
import { AuditLogService } from '@module/Audit/AuditLogService';
import { Request } from 'express';
import { CustomerService } from '@module/Customer/CustomerService';

@ApiTags('Token')
@ApiBearerAuth('JWT-auth')
@Controller('/token')
export class TokenController {
  constructor(
    private tokenService: TokenService,
    private readonly auditLogService: AuditLogService,
    private readonly customerService: CustomerService) { }

  @Roles(AuthRoles.Admin, AuthRoles.Sales)
  @Get()
  async getAll(): Promise<Token[]> {
    return this.tokenService.findAll();
  }

  // @Roles(AuthRoles.Admin, AuthRoles.Sales)
  // @Post()
  // async createToken(@Body() data: TokenCreateDto): Promise<TokenCreateDto> {
  //   return this.tokenService.createToken(data);
  // }

  @Roles(AuthRoles.Admin, AuthRoles.Sales)
  @Get('/search-by-token/:token')
  async serchToken(@Param("token") token: number): Promise<any> {
    return this.tokenService.searchByToken(token);
  }

  @Roles(AuthRoles.Admin, AuthRoles.Sales)
  @Get('generate-token')
  async generateToken(@Req() request: any): Promise<{ token: number }> {

    let token = await this.getToken(request.user.id)
    return { token }
  }

  private async getToken(id: string): Promise<number> {
    const token = Math.floor(Math.random() * 100000)
    const exits = await this.tokenService.findOne(token)
    console.log(exits)
    if (exits !== null) {
      this.getToken(id)
    }
    const tokenData = {
      token,
      status: false
    }
    await this.tokenService.createToken(tokenData).then(() => {
      this.auditLogService.logAction(id, 'created', JSON.stringify({ action: "generate token", comment: "Created by generate token" }), "Token")
    }).catch(() => { });
    return token
  }
}
