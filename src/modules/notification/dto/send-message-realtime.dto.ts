import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { ERealTimePick } from '../notification.enum';

export class SendMessageRealTimeDto {
  @ApiProperty({
    description: ' gui len xanh hoac do',
    default: ERealTimePick.XANH,
  })
  @IsEnum(ERealTimePick)
  type: string;
}
export class SendMessageRealTimeUserDto {
  @ApiProperty({
    description: ' gui len xanh hoac do',
    default: ERealTimePick.XANH,
  })
  @IsEnum(ERealTimePick)
  type: string;

  @ApiProperty({
    description: ' user Id',
  })
  @IsString()
  userId: string;
}
