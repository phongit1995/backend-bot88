import { Injectable } from '@nestjs/common';
import { FcmPushService } from 'src/shared/services/firebase.service';

@Injectable()
export class NotificationService {
  constructor(private fcmPushService: FcmPushService) {}
  async testPush(deviceToken: string) {
    this.fcmPushService.sendMessage({
      to: deviceToken,
      notification: {
        title: 'test',
        body: 'test',
      },
    });
  }
}
