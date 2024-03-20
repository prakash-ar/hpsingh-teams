import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '@module/User/UserService';
import { JWT_SECRET } from '../../shared/constants/global.constants';

import { JwtStrategy } from './AuthJwtStrategy';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { User } from '@model/UserModel';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    SequelizeModule.forFeature([User])
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
