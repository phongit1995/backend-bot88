import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: '0372046803' })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ example: 'hello' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'HELLOAPP', required: false })
  @IsString()
  @IsOptional()
  referralCode: string;
}
export class ResRegisterUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type: number;

  @ApiProperty()
  role: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
