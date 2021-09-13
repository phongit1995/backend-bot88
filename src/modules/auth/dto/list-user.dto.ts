import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ResPaginationDto } from 'src/common/text.helper';
import { ResRegisterUserDto } from './register-user.dto';

export class ListUserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;
}

export class ResListUserDto extends ResPaginationDto {
  @ApiProperty({ type: [ResRegisterUserDto] })
  records: ResRegisterUserDto[];
}
