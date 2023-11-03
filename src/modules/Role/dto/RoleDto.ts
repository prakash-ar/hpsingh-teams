import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RoleCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}