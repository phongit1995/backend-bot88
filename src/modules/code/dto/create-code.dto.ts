import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCodeDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  type: boolean;

  // @ApiProperty({ example: true })
  // @IsBoolean()
  // @IsOptional()
  // actived?: boolean;

  @ApiProperty({
    example:
      'Cấu hình điện thoại của bạn k phù hợp mã phần mềm này. Vui lòng nhập mã phần mềm khác',
    required: false,
  })
  @IsString()
  @IsOptional()
  message: string;
}
