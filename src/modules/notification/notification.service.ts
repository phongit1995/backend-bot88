import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FcmPushService } from 'src/shared/services/firebase.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class NotificationService {
  constructor(
    private fcmPushService: FcmPushService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async testPush(deviceToken: string) {
    this.fcmPushService.sendMessage({
      to: deviceToken,
      notification: {
        title: 'khoa 3',
        body: 'khoa 3',
      },
    });
  }
  async sendNotification(type: number) {
    let listUser = await this.getTokenOfUser(type);
    console.log(listUser);
  }
  async getTokenOfUser(typeUser: number) {
    return this.userModel
      .find({
        type: typeUser,
      })
      .select({ token: 1 });
  }
}
