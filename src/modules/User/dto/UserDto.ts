import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { INVALID_EMAIL } from "src/shared/constants/strings";

export class UserDto {
  id: string;
  email: string;  
  firstName: string;
  lastName: string;
  mobile: number
  isActive: boolean;
  roleId:number
}