import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_EXPIRY_SECONDS } from '@shared/constants/global.constants';

import { AuthService } from './AuthService';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './AuthDto';
import { GLOBAL_CONFIG } from 'src/configs/global.config';
import { SkipAuthGuard } from './SkipAuthDecorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @SkipAuthGuard()
  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  async login(@Body() user: LoginUserDTO, @Response() res) {
    const loginData = await this.authService.login(user);
    if (loginData.errorCode) {
      return res.status(400).send(loginData);
    }
    const expires = new Date(new Date().getTime() + GLOBAL_CONFIG.security.expiresIn * 1000)
    return res.status(200).send({ ...loginData, expires });
  }

  // @Post('register')
  // async register(@Body() user: RegisterUserDTO): Promise<User> {
  //   return this.authService.register(user);
  // }

  @SkipAuthGuard()
  @Post('logout')
  logout(@Response() res): void {
    res.clearCookie('accessToken');
    res.status(200).send({ success: true });
  }
}
