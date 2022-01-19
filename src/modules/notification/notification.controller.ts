import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/auth.guard';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { PushNotificationDevicesDto } from './dto/push-devices.dto';
import {
  SendMessageRealTimeDto,
  SendMessageRealTimeUserDto,
} from './dto/send-message-realtime.dto';
import { SendNotificationToUserDto } from './dto/send-notification-to-user.dto';
import {
  ResNotificationDto,
  SendNotificationDto,
} from './dto/send-notification.dto';
import { NotificationService } from './notification.service';
@ApiTags('Notification Api')
@ApiConsumes('Notification Api')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('test-device')
  @ApiOperation({ summary: 'test gửi thông báo tới 1 thiết bị' })
  @HttpCode(204)
  async testToDevices(
    @Body() pushNotificationDevicesDto: PushNotificationDevicesDto,
  ) {
    return this.notificationService.testPush(pushNotificationDevicesDto.token);
  }

  @Post('send')
  @ApiOperation({ summary: 'gửi thông báo cho nhóm người dùng' })
  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: ResNotificationDto, status: 200 })
  async send(@Body() SendNotificationDto: SendNotificationDto) {
    return this.notificationService.sendNotification(SendNotificationDto.type);
  }
  @Post('user/:id')
  @ApiOperation({ summary: 'gửi thông báo cho 1 user' })
  async sendToUser(
    @Body() sendNotificationToUserDto: SendNotificationToUserDto,
    @Param('id', new ParseObjectIdPipe()) id: string,
  ) {
    return this.notificationService.sendNotificationToUser(
      id,
      sendNotificationToUserDto.type,
    );
  }
  @Post('send-message')
  @ApiOperation({ summary: 'gửi thông báo xanh đỏ' })
  @HttpCode(200)
  @ApiOkResponse({ type: ResNotificationDto, status: 200 })
  async sendMessage(@Body() sendMessageRealTimeDto: SendMessageRealTimeDto) {
    return this.notificationService.sendNotificationRealtime(
      sendMessageRealTimeDto,
    );
  }
  @Post('send-message-user')
  @ApiOperation({ summary: 'gửi thông báo xanh đỏ tới user' })
  @HttpCode(200)
  @ApiOkResponse({ type: ResNotificationDto, status: 200 })
  async sendMessageUser(
    @Body() sendMessageRealTimeUserDto: SendMessageRealTimeUserDto,
  ) {
    return this.notificationService.sendNotificationRealtimeUser(
      sendMessageRealTimeUserDto.userId,
      sendMessageRealTimeUserDto.type,
    );
  }
}
