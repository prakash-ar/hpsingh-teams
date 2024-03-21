import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_EXPIRY_SECONDS } from '@shared/constants/global.constants';

import { AuthService } from './AuthService';
import { AuthResponseDTO, GenetateOtpDto, LoginUserDTO, OtpResponseDto, RegisterUserDTO, ValidateOtpDto, ValidateOtpResponseDto } from './AuthDto';
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

  @SkipAuthGuard()
  @Post('logout')
  logout(@Response() res): void {
    res.clearCookie('accessToken');
    res.status(200).send({ success: true });
  }


  @SkipAuthGuard()
  @Post('generate-otp')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: GenetateOtpDto })
  async genetareOtp(@Body() user: GenetateOtpDto, @Response() res): Promise<OtpResponseDto> {
    const otpData = await this.authService.generateOtp(user);
    return res.status(200).send(otpData);
  }

  @SkipAuthGuard()
  @Post('validate-otp')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: ValidateOtpDto })
  async ValidateOtp(@Body() user: ValidateOtpDto, @Response() res): Promise<ValidateOtpResponseDto> {
    const otpData = await this.authService.validateOtp(user);
    return res.status(200).send(otpData);
  }
}
