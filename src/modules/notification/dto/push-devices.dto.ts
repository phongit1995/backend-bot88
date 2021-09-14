import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PushNotificationDevicesDto {
  @ApiProperty()
  @IsString()
  token: string;
}
