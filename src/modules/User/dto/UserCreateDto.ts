import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
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
  @IsInt()
  roleId:number
}