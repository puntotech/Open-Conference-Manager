import { Injectable } from '@nestjs/common';
import { authConfig } from '../config/auth.config';
import { google } from 'googleapis';
import { User } from 'src/shared/dto/user.dto';

const auth = authConfig.google;

@Injectable()
export class GoogleAuthService {
  async getUser(access_token: string): Promise<User> {
    const client = new google.auth.OAuth2(auth.appId, auth.appSecret);

    client.setCredentials({ access_token });

    const oauth2 = google.oauth2({
      auth: client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();
    return {
      name: data.name,
      photoUrl: data.picture,
      locale: data.locale,
      email: data.email,
      id: data.id,
    };
  }
}
