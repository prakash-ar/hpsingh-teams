
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { INVALID_EMAIL } from '../../shared/constants/strings';
import { User } from '@model/UserModel';
import { UserDto } from '@module/User/dto/UserDto';

export class AuthResponseDTO {
  user: UserDto;
  accessToken: string;
  errorCode?: string;
  message?: string
}

export class RegisterUserDTO {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
