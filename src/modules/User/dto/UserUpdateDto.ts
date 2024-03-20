import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { INVALID_EMAIL } from "src/shared/constants/strings";

export class UserUpdateDto {
  @IsString()
  @ApiProperty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email?: string;

  @IsString()
  @ApiProperty()
  password?: string;

  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsInt()
  @ApiProperty()
  @Min(10)
  mobile?: number

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => { return value ? JSON.parse(value) : [] })
  userRoles: CreateUserRoles[]
}

class CreateUserRoles {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roleId: string
}