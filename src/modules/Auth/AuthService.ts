import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';

import { AuthResponseDTO, GenetateOtpDto, LoginUserDTO, OtpResponseDto, RegisterUserDTO, ValidateOtpDto } from './AuthDto';
import { User } from '@model/UserModel';
import { UserService } from '@module/User/UserService';
import { PASSWORD_MISMATCH, USER_NOT_AUTHORIZED, USER_NOT_FOUND } from './AuthConstants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUserByEmailMobileWithAllAttributes(loginUserDTO.username);

    if (!userData) {
      return {
        user: null,
        accessToken: '',
        errorCode: USER_NOT_FOUND
      };
    }
    if (userData.isMobileAccessOnly) {
      return {
        user: null,
        accessToken: '',
        errorCode: USER_NOT_AUTHORIZED,
        message: "Web access denied"
      };
    }
    const isMatch = await AuthHelpers.verify(
      loginUserDTO.password,
      userData.password,
    );

    if (!isMatch) {
      return {
        user: null,
        accessToken: '',
        errorCode: PASSWORD_MISMATCH
      };
    }
    let roles = []
    const business = []
    if (userData.roles) {
      for (const rolesInfo of userData.roles) {
        roles.push(rolesInfo.dataValues.name)
      }
    }
    if (userData.business !== null) {
      for (const businessInfo of userData.business) {
        business.push(businessInfo.dataValues.id)
      }
    }
    const payload = {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      isActive: userData.isActive,
      isMobileAccessOnly: userData.isMobileAccessOnly,
      roles: roles,
      business
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }

  public async generateOtp(genetateOtpDto: GenetateOtpDto): Promise<OtpResponseDto> {
    return this.userService.generateOtp(genetateOtpDto.phone)

  }

  public async validateOtp(user: ValidateOtpDto): Promise<any> {
    const userData = await this.userService.validateOtp(user)

    const roles = []
    const business = []

    if (userData.roles) {
      for (const rolesInfo of userData.roles) {
        roles.push(rolesInfo.dataValues.name)
      }
    }
    if (userData.business !== null) {
      for (const businessInfo of userData.business) {
        business.push(businessInfo.dataValues.id)
      }
    }
    const payload = {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      isActive: userData.isActive,
      isMobileAccessOnly: userData.isMobileAccessOnly,
      roles: roles,
      business
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
}
