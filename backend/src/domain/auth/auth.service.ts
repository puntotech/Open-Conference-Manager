import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface SocialUser {
  id: number | string;
  name: string;
  email: string;
}

export type GetSocialUserHandler = () => Promise<Partial<SocialUser>>;

@Injectable()
export class AuthService {
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
      sub: user.id,
      username: user.username,
    };

    let refresh_token: string;

    /* if (environments.accessTokenExpiration) {
      refresh_token = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(user),
      );
    } */

    return {
      access_token: null /* await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(user),
      ) */,
      refresh_token,
    };
  }

  async loginWithThirdParty(
    fieldId,
    getSocialUser: GetSocialUserHandler,
    customName?: string,
  ) {
    try {
      const { name, email, id } = await getSocialUser();
      console.log(await getSocialUser());
      /* 
      const internalUser = await this.userService.getUserBy({ [fieldId]: id });

      if (internalUser) {
        if (
          internalUser.email != email &&
          !(await this.userService.getUserByEmail(email))
        ) {
          internalUser.email = email;

          await internalUser.save();
        }

        return this.login(internalUser);
      }

      if (await this.userService.getUserByEmail(email)) {
        throw new BadRequestException('Email already exists');
      }

      const username = await this.userService.generateUsername(
        customName || name,
      );

      const user = await this.userService.create({
        username,
        email,
        [fieldId]: id,
      });

      return this.login(user); */
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new UnauthorizedException('Invalid access token');
    }
  }

  getAccessTokenOptions(user) {
    return this.getTokenOptions('access', user);
  }

  private getTokenOptions(type: 'refresh' | 'access', user) {
    const options = {
      /*    secret: environments[type + 'TokenSecret'] + user.sessionToken, */
    };

    /* const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    } */

    return options;
  }
}
