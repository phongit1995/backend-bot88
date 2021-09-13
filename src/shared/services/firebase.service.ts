import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fcmPush from 'fcm-push';
@Injectable()
export class FcmPushService {
  private fcm: any;
  constructor(private configService: ConfigService) {
    this.fcm = new fcmPush(configService.get<string>('NOTIFICATION_KEY'));
  }
  async sendMessage(message: pushMessage): Promise<void> {
    this.fcm.send(message, function(err, response) {
      if (err) {
        console.log(err);
        console.log('Push Notification False');
      } else {
        console.log(response);
      }
    });
  }
}
export interface pushMessage {
  to?: string;
  registration_ids?: string[];
  collapse_key?: string;
  notification: { title: string; body: string; image?: string };
  data?: { [index: string]: any };
  apns?: {
    fcm_options?: { image: string };
  };
}
