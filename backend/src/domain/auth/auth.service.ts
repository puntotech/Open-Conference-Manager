import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Speaker } from '@modules/speaker/speaker.entity';
import { SpeakerService } from '@modules/speaker/speaker.service';
import { Talk } from '@modules/talk/talk.entity';
import { TalkService } from '@modules/talk/talk.service';
import { environment } from 'src/environment';
import { verify } from 'jsonwebtoken';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SocialUser {
  id: number | string;
  name: string;
  email: string;
  picture: string;
  locale: string;
}

export type GetSocialUserHandler = () => Promise<Partial<SocialUser>>;

@Injectable()
export class AuthService {
  constructor(
    private readonly speakerService: SpeakerService,
    private readonly talkService: TalkService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
      { secret: this.configService.get<string>('JWT_SECRET') },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async checkToken(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : [undefined, undefined];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    const decoded = this.verifyJWTToken(token);
    const speaker: Speaker & { talks?: Talk[] } =
      await this.speakerService.findOne({
        where: { id: decoded.id, email: decoded.email },
      });

    if (!speaker) {
      throw new UnauthorizedException();
    }

    speaker.talks = await this.talkService.getBySpeakerId(speaker.id);

    request.user = speaker;
    return true;
  }

  async loginWithThirdParty(
    getSocialUser: GetSocialUserHandler,
    fieldId = 'email',
  ) {
    try {
      const data = await getSocialUser();

      const internalUser = await this.speakerService.upsert({
        name: data.name,
        photoUrl: data.picture,
        locale: data.locale,
        email: data.email,
      });

      return this.login(internalUser);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new UnauthorizedException('Invalid access token');
    }
  }

  public getRefreshTokenOptions(user /* : User */): JwtSignOptions {
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

  protected verifyJWTToken(token: string): { id: string; email: string } {
    try {
      return verify(token, this.configService.get<string>('JWT_SECRET')) as any;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
