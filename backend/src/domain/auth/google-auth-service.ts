import { Injectable } from '@nestjs/common';
import { authConfig } from './config/auth.config';
import { google } from 'googleapis';

const auth = authConfig.google;

@Injectable()
export class GoogleAuthService {
  async getUser(accessToken: string) {
    const client = new google.auth.OAuth2(auth.appId, auth.appSecret);

    client.setCredentials({ access_token: accessToken });

    const oauth2 = google.oauth2({
      auth: client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    return data;
  }
}
