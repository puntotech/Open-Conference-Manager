import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { Speaker } from '@modules/speaker/speaker.entity';
import { SpeakerService } from '@modules/speaker/speaker.service';
import { environment } from 'src/environment';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SocialUser {
  id: number | string;
  name: string;
  email: string;
}

export type GetSocialUserHandler = () => Promise<Partial<SocialUser>>;

@Injectable()
export class AuthService {
  constructor(
    private speakerService: SpeakerService,
    private jwtService: JwtService,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async login(user): Promise<TokenResponse> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    let refreshToken: string;

    if (environment.accessTokenExpiration) {
      refreshToken = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(user),
      );
    }

    const accessToken = await this.jwtService.signAsync(
      payload,
      /* this.getAccessTokenOptions(user), */
      { secret: 'Secret' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async loginWithThirdParty(
    getSocialUser: GetSocialUserHandler,
    fieldId = 'email',
  ) {
    try {
      const { name, email } = await getSocialUser();
      console.log(await getSocialUser());

      let internalUser = await this.speakerService.findOne({
        [fieldId]: email,
      });

      if (!internalUser) {
        internalUser = new Speaker();
        internalUser.email = email;
        internalUser.name = name;
        await internalUser.save();
      }

      return this.login(internalUser);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new UnauthorizedException('Invalid access token');
    }
  }

  getAccessTokenOptions(user /* : User */) {
    return this.getTokenOptions('access', user);
  }
  getRefreshTokenOptions(user /* : User */): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }

  private getTokenOptions(type: 'refresh' | 'access', user) {
    const options = {
      secret: environment[type + 'TokenSecret'] + user.sessionToken,
      expiresIn: null,
    };

    const expiration = environment[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
