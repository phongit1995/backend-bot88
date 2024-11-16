import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { JWT } from 'google-auth-library';


@Injectable()
export class FcmPushService {
  private projectId= "bots-ed127";
  private readonly clientEmail= "firebase-adminsdk-9rh6n@bots-ed127.iam.gserviceaccount.com";
  private key= "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDBlGdIFRFdKans\nK48UcpDTwEzIhW8DXFwvRGgkI2aHAQn9lfUsKIJ057xKRZ58fIAxiy7meHG5aqM6\nUckYblDWw+MZ4mQ/DFTwtbAffXXw4PklftgLCdTUNk+61dx94+Q6dKKHe5rn2fmi\nMwYTxb3BdFP50tutZF91WWGdwYF4QeOmxaIVHncRiySj0qfS00eyYQe6D0JlWXtA\nCjGuBmNU7/NXLPCuAWrlrd/zERfivSND13rlJZ2B04tU7wxd5padFbOHWrfSB6YJ\nSlCyaghxnnKIgLHOejIqB94F2B8EvCdbrZjL9R2eooD/SIPr3AXkHlJ79+XIVEju\naZneBrwJAgMBAAECggEAASoKRmCOdbpT+D4zBb5PP1+TJqT7Mko6XLQ2d+2SYFWV\nHYyq4fZBaJoVlt3DbDMkfNSXnN4heV1aK3YSXBg0jY7o8GVdHhSN9NLaHKpfJl2r\nNrqqhBB6uPPPRKVxUy/m1fCQvKwor5diQ4Odvpcythvj8gC+y2FrG8EEnKBtQQ+j\nsC4E2fgt7icDmdrZzQzOCLCS1+YMjoV1GMAfr0C3jxUpqJ4JHbpaHAVTMQNyM7/k\n1Vh3iuX4KPsBO60D3B3qmCg/4lRQVeytrRV9q41TA0H3hN7CAdczt2wzoDkmrATR\nNkzdR5Cnh9BhWkKLEsn0ddX7S119Au44tGCziGfcjQKBgQDFb07SuLGIR/2fLV8G\nR8h8aItBsaAvTIF7SLkQhZ4JoKIKKjLiUMyr07K61UkF/veORxFtj2BNBaRcGhEn\nXmS6W6Und9PCinS+ul3uq600anP4hnT7m8S+cIc5YmkW+o9xQXMYnl4w7pLvQjOg\nWb5L8T3Ivc+ARvzt3trMScqz1QKBgQD7AFl3ARX/XIFwPodW6kmUHfTc8iDnZ68J\nioM3MOo+Gc6VC8qGBoTF17spUCiCpUKW0BaADyFHKjU3S9ozobPdT9zKr6FJGuES\nATt07mriZMWf4dh7IIygXJR0K2vaG3VWc89IEyIEgyxlcvn6YTkSH8uScrrPCVt9\nWtS2+NAlZQKBgQCjlFxvdL0K1/LHnpTbpD/0671tWZkJd07UcWV7zekpuuBmoZ31\nKtLZDpZH/Az7nctII5PJ/X/hcOpDsQlDYA7+5I2KjNpzlbmyiMDozW69PfIGGIj2\nKpIw4xT2s5W0hzavtHWDETujOReeinAxzAlB7IevOayhcK+A+iK4He+HXQKBgQCE\nYZHN7xewABUQoxn0YEsAQLB1m4p5IbkyuggsorLYn/nRqE9fUq7SPc6romhLR2gQ\nbJ2BWvl9NCivCmWCF8XqcoWLrQfOq8uLGHVIXbqnvuhwQ8hOYENrDIkLoB8ZAKRp\nPVlUtSqa4KgYtYRcZsyX34cZrUMTkObc/Xv1KNN29QKBgQCMk0eBz9pB52AeXyOS\n03veTwBuz8OpQTP/cdLQNg2HA5GgeW1+RWOuDW2zoY5livetXaih4L2BHJwH9lXK\nxbzF6wThxivXBEdpNEGUpclWrKAhwEGd6W1FTeL9/oSDSiQiav/L2VQb+NkmLbON\n0I7Xh/RYJmYIvfhJhWxbHEhQ+A==\n-----END PRIVATE KEY-----\n";
  private readonly fcmUrl = `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`;
  constructor(private configService: ConfigService) {
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
    return new Promise((resolve, reject) =>{
      const jwtClient = new JWT(
        this.clientEmail,
        null,
        this.key,
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
