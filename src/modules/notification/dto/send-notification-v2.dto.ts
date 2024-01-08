import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
export enum ESendNotificationV2Type {
  XANH = 1,
  DO = 2,
}
export class SendNotificationV2Dto {
  @ApiProperty({
    example: 1,
    description:
      'Kiểu gửi thông báo . Mua:1 , Ban:2,Tai:3,Xui :4 , Chan:5 ,Le:6',
  })
  @IsEnum(ESendNotificationV2Type)
  type: number;

  @ApiProperty({
    example: 'hello',
    description: 'Room id',
  })
  @IsString()
  roomId: string;

  @ApiProperty({
    example: 69,
    description:'phần trăm',
  })
  @IsOptional()
  @IsNumber()
  percent?: number;
}

export class ResNotificationV2Dto {
  @ApiProperty({ example: 'Gửi Thành Công' })
  message: string;
}
