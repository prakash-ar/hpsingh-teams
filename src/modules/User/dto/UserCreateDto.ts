import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { INVALID_EMAIL } from "src/shared/constants/strings";

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @Min(10)
  mobile: number


  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isMobileAccessOnly: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @Transform(({ value }) => { return value; })
  userRoles: CreateUserRoles[]

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @Transform(({ value }) => { return value; })
  userBusiness: CreateUserBusiness[]
}

class CreateUserRoles {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  roleId: number
}

class CreateUserBusiness {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  businessId: number
}