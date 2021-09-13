import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Length, MaxLength, MinLength } from 'class-validator';
import { ResRegisterUserDto } from './register-user.dto';

export class LoginUserDto {
  @ApiProperty({ example: '0372046801' })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ example: 'hello' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class ResLoginUserDto extends OmitType(ResRegisterUserDto, [
  'password',
]) {
  @ApiProperty()
  token: string;
}
