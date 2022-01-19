import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
export enum ESendNotificationType {
  XANH = 1,
  DO = 2,
  TAI = 3,
  XIU = 4,
  CHAN = 5,
  LE = 6,
}
export class SendNotificationDto {
  @ApiProperty({
    example: 1,
    description:
      'Kiểu gửi thông báo . Mua:1 , Ban:2,Tai:3,Xui :4 , Chan:5 ,Le:6',
  })
  @IsEnum(ESendNotificationType)
  type: number;
}

export class ResNotificationDto {
  @ApiProperty({ example: 'Gửi Thành Công' })
  message: string;
}
