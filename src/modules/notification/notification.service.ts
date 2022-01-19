import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FcmPushService } from 'src/shared/services/firebase.service';
import { SocketGetWay } from '../socket/socket.getway';
import { User } from '../users/schemas/user.schema';
import { ESendNotificationToUser } from './dto/send-notification-to-user.dto';
import { ESendNotificationType } from './dto/send-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private fcmPushService: FcmPushService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly socketGetWay: SocketGetWay,
  ) {}
  async testPush(deviceToken: string) {
    this.fcmPushService.sendMessage({
      to: deviceToken,
      notification: {
        title: 'khoa 3',
        body: 'khoa 3',
        sound: 'default',
      },
    });
  }
  async sendNotification(type: number) {
    let listToken = await this.getTokenOfUser(type > 2 ? 2 : 1);
    if (listToken.length == 0) {
      return;
    }
    let message: string = '';
    switch (type) {
      case ESendNotificationType.XANH:
        message = 'Xanh';
        break;
      case ESendNotificationType.DO:
        message = 'Đỏ';
        break;
      case ESendNotificationType.CHAN:
        message = 'Chẵn';
        break;
      case ESendNotificationType.LE:
        message = 'Lẻ';
        break;
      case ESendNotificationType.TAI:
        message = 'Tài';
        break;
      case ESendNotificationType.XIU:
        message = 'Xỉu';
        break;
      default:
        message = '';
    }
    await this.fcmPushService.sendMessage({
      registration_ids: listToken,
      notification: {
        title: ' Lệnh    ',
        body: message,
        sound: 'default',
      },
      data: {
        type,
      },
    });
    return {
      message: 'Gửi thành công. ',
    };
  }
  async getTokenOfUser(typeUser: number): Promise<string[]> {
    let users = await this.userModel
      .find({
        type: typeUser,
        role: { $ne: 2 },
      })
      .select({ token: 1 });
    let token: string[] = [];
    users.forEach(user => {
      token = token.concat(user.token);
    });
    return token;
  }

  async sendNotificationToUser(id: string, type: number) {
    let user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        'Người dùng không tồn tại .',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.token.length == 0) {
      return;
    }
    let message: string = '';
    switch (type) {
      case ESendNotificationToUser.CON:
        message = 'Con';
        break;
      case ESendNotificationToUser.CAI:
        message = 'Cái';
        break;
      case ESendNotificationToUser.CHAN:
        message = 'Chẵn';
        break;
      case ESendNotificationToUser.LE:
        message = 'Lẻ';
        break;
      case ESendNotificationToUser.TAI:
        message = 'Tài';
        break;
      case ESendNotificationToUser.XIU:
        message = 'Xỉu';
        break;
      case ESendNotificationToUser.XANH:
        message = 'Xanh';
        break;
        case ESendNotificationToUser.XANH:
          message = 'Đỏ';
          break;
      default:
        message = '';
    }
    await this.fcmPushService.sendMessage({
      registration_ids: user.token,
      notification: {
        title: '  Lệnh   ',
        body: message,
      },
      data: {
        type,
      },
    });
    return {
      message: 'Gửi thành công. ',
    };
  }
  async sendNotificationRealtime(data: any) {
    this.socketGetWay.server.emit('result', data);
    return { message: 'success' };
  }
  async sendNotificationRealtimeUser(userId: string, data: string) {
    this.socketGetWay.server.to(userId).emit('result', { type: data });
    return { message: 'success' };
  }
}
