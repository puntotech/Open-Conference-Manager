import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import * as TwitterPassportStrategy from 'passport-twitter';
//import * as TwitterTokenStrategy from 'passport-twitter-token';

import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/shared/dto/user.dto';

@Injectable()
export class TwitterStrategy extends PassportStrategy(
  TwitterPassportStrategy,
  'twitter',
) {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_APP_ID,
      consumerSecret: process.env.TWITTER_APP_SECRET,
      callback: 'http://127.0.0.1:3000/auth/twitter/signin',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: User, info?: any) => void,
  ): Promise<void> {
    const { id, name, emails, photos } = profile;
    const user: User = {
      id,
      email: emails[0].value,
      name: `${name.givenName}${name.familyName}`,
      photoUrl: photos[0].value,
    };
    done(null, user);
  }
}
