
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '@module/User/dto/UserDto';
export class AuthResponseDTO {
  user: UserDto;
  accessToken: string;
  errorCode?: string;
  message?: string
}

export class OtpResponseDto {
  otp: number | null;
  status: string
  message?: string
}

export class ValidateOtpResponseDto {
  status: string
  message?: string;
  user: UserDto | null;
  accessToken: string | null;
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


export class GenetateOtpDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  phone: number;
}


export class ValidateOtpDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  phone: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  otp: number;
}