import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ESendNotificationType } from './send-notification.dto';

export class SendNotificationToUserDto {
  @ApiProperty({
    example: 1,
    description:
      'Kiểu gửi thông báo  . api này gửi 3 hoặc 4 thôi .. Mua:1 , Ban:2,Tai:3,Xui :4 , Chan:5 ,Le:6',
  })
  @IsEnum(ESendNotificationType)
  type: number;
}
