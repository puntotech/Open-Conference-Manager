import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { User } from 'src/shared/dto/user.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  FacebookTokenStrategy,
  'facebook-token',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v3.0',
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
