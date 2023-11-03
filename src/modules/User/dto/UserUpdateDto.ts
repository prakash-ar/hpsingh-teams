import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
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
 
  @ApiProperty()
  @IsInt()
  roleId?:number
}