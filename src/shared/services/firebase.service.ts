import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fcmPush from 'fcm-push';
import * as firebaseConfig from './firebase.json';
import axios from 'axios';

import { JWT } from 'google-auth-library';

@Injectable()
export class FcmPushService {
  private fcm: any;
  private readonly fcmUrl = `https://fcm.googleapis.com/v1/projects/${firebaseConfig.project_id}/messages:send`;
  constructor(private configService: ConfigService) {
    this.fcm = new fcmPush(configService.get<string>('NOTIFICATION_KEY'));
  }
  async sendMessage(message: pushMessage): Promise<void> {
    const messageToken = {
      message: {
        tokens: message.registration_ids,
        token: message.to,
        notification: {
          title: message.notification.title,
          body: message.notification.body,
        },
        android: {
          ttl: '3600s', 
          priority: 'high',
        },
        apns: {
          headers: {
            'apns-priority': '10',
          },
        },
      },
    };
    console.log(messageToken);
    try {
      // Call Firebase Cloud Messaging API
      const response = await axios.post(this.fcmUrl, messageToken, {
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Notification sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error.response ? error.response.data : error.message);
      console.log(JSON.stringify(error.response.data))
      throw error;
    }
    // this.fcm.send(message, function(err, response) {
    //   if (err) {
    //     console.log(err);
    //     console.log('Push Notification False');
    //   } else {
    //     console.log(response);
    //   }
    // });
  }

  async getAccessToken(){
    return new Promise(function(resolve, reject) {
      const jwtClient = new JWT(
        firebaseConfig.client_email,
        null,
        firebaseConfig.private_key,
        ['https://www.googleapis.com/auth/firebase.messaging'],
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        console.log(tokens.access_token);
        resolve(tokens.access_token);
      });
    });
  }
}
export interface pushMessage {
  to?: string;
  registration_ids?: string[];
  collapse_key?: string;
  notification: { title: string; body: string; image?: string ,sound?:string};
  data?: { [index: string]: any };
  apns?: {
    fcm_options?: { image: string };
  };
}
