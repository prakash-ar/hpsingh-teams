import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsBoolean } from "class-validator";

export class TokenCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

}