import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/dto/user.dto';
import { google } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  async getUser(access_token: string): Promise<User> {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
    );

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
