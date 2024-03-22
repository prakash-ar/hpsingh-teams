import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CustomerCreateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customerType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  billingMode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  otp: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  token: number;
}

