import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fcmPush from 'fcm-push';
import axios from 'axios';

import { JWT } from 'google-auth-library';
const firebaseConfig = {
  "type": "service_account",
  "project_id": "bots-ed127",
  "private_key_id": "6ef81b30697dcf2270db76cbb099b4a07515ddd5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQ8IK8GRk3Fqiv\nFbkvFqeUyxS1jo4xZk6a5lcbSXCggyASIF9FZAIgLdhjtIURy1qo9VcRGCbxD6GZ\nebMiglVlZxs53wYkdb4gZ6d+TheLmYfE5WWmjklC1FzYVexW7S8+IrX/Zxio/9DU\nfGEVihHoI17Z71rIqt6AUQwA7ZWmqanCN6O0Gxe0Hrwb6TlCWjyqvFat3EfYZHjX\nEvcHGOJbSOHEi1zfU3P0ZJUzcLPSrDrpM20h2sxdkJhN8aT4kL+x5kKr3IZqsi52\n2iLQHvvuX0e0JSh9ahSqgW5WsEN7jGWdhT5+nJ7g33jhCnL4YHZ5AnAL95VQJtkH\nKIAxRDfzAgMBAAECggEAROZ4l5ds07HLVZQDmN1xo7uYqChQ8y3ZzywRm5ChYESF\nUeiesZt1oTt6AwfVPFzJx8j9b0xmcrEGFrHyVMTVeKN3n16kil+Iltn/lvzjl4LQ\nNmsAlBlOvVy7mEHcXIRbMXQJxZSKdghKC0DnW/hrQ8nQtNRieUM1C5W7mZNX0UZe\nHXb0posMknS946/jGty9Jx5mnlBJdUp2mOC4rQ4PAeI9USjgj+wnLzLjhU7YeMdJ\nQ+PFOCVnUkBX0V4OS89DOvn0C5qTMSazAssq+zjcdiaGvZYBX1zxXrzaC61q/WUb\nQpJN7dX/h4h9ph1/0Ab80Swr1DassYzBgvCoGJB57QKBgQC+59gTFhRP5H7xIt4S\n3ehBTgvnaNaLD9qeYuJDGXmY119080vi7Bv6uqfp2OhG/0jxPi4GJV4YQW3t35uB\nef6AiV2BAMbFCK7eEago8WSOiLmoBQwki+EjhuJJWsBcxZt/LgxTXhORZhDKY9+G\nqmwMZg7YpE0rAKNxIANOFw0oZwKBgQDCXEf4/sLDLj7qFVlnOjkP0/S91fTj3xuA\np4tpPZjxa4vKGEEot6QP0VFECtpJKIkZM7umEdnBH+GNg2TUWjfh/70lABklihSZ\n/OClGmw4LtW3HkXxW4M1Zry5RzGey8w4xxQbWRpBFTotJYj6CgijUCgiv2AGypPJ\nQwHSHMYslQKBgCM3rfrHZfPfGTPu1LzyRvhVJ4kHJBz/TbtOTqNGPdJeWPPANk2k\ndPzqFjPjmeYPDivC5sanehZLa7YoPA3ErZiUvrUfqYuLsIazByyWa5CH1IgUdkr/\nqwbcyT3zCe2TXr41hnySrFV0WMCdcAztv4UCBtccaEf4lC44U6PCSOEdAoGAShRI\nLmRTsXbn7eqTN+AeLaU4zD5HZ6762Y+CeGtM5v95uV6DP1S3SHwcgFWum2HC14M7\nS3HUUGKpYnmpLbLxR8dkvTyLWR6G+aZDrUoj40oelPwJ5pNdsDXnSqsTA5Zj0WQ3\nirDsa8/+a4S576txXWXI1m2g2RXPPE+42u+yrP0CgYEAknMEyBfZfhmfkvMaYKeF\nCNU0b9bkWySupYcZQdxEN1o3v5IcgLXWknk438MgWtM+riypCJ9kknR99rQBBmc8\nwgHL24VN6fnijq6iC0dL4OR4RsfY+XjCtfb2M+0qneQkPXxjVvT37RDUtP7GAyfs\nv1XLnB7w0COxdmFAge/H76E=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9rh6n@bots-ed127.iam.gserviceaccount.com",
  "client_id": "105424239758703361791",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9rh6n%40bots-ed127.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


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
