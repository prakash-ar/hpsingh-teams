import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { AuthHelpers } from '@shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';

import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './AuthDto';
import { User } from '@model/UserModel';
import { UserService } from '@module/User/UserService';
import { PASSWORD_MISMATCH, USER_NOT_FOUND } from './AuthConstants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUserByEmailWithAllAttributes(loginUserDTO.email);

    if (!userData) {
      return {
        user: null,
        accessToken: '',
        errorCode: USER_NOT_FOUND
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

    const payload = {
      id: userData.id,
      email: userData.email, 
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      isActive: userData.isActive,
      roleId:userData.roleId
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
  // public async register(user: RegisterUserDTO): Promise<User> {
  //   return this.userService.createUser(user);
  // }
}
