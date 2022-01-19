import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum ESendNotificationToUser {
  CON = 1,
  CAI = 2,
  TAI = 3,
  XIU = 4,
  CHAN = 5,
  LE = 6,
  XANH=7,
  D0=8
}
export class SendNotificationToUserDto {
  @ApiProperty({
    example: 1,
    description:
      'Kiểu gửi thông báo  . api này gửi 3 hoặc 4 thôi .. Mua:1 , Ban:2,Tai:3,Xui :4 , Chan:5 ,Le:6',
  })
  @IsEnum(ESendNotificationToUser)
  type: number;
}
