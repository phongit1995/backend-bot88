import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyZaloAuthCodeDto {
  @ApiProperty({ example: 'HELLO-APP' })
  @IsString()
  code: string;

  @ApiProperty({ example: 21.0272256 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 105.578496 })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
