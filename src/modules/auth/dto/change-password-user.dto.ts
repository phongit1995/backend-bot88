import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AdminChangePasswordUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  password: string;
}
