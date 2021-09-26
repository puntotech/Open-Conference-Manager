import { Injectable, BadRequestException } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { OAuth } from 'oauth';
import { promisify } from 'util';
import { Request } from 'express';

@Injectable()
export class TwitterAuthService {
  private oauthConsumer: OAuth;
  private oauthRequestToken: string;
  private oauthRequestTokenSecret: string;

  private twitterConfig = {
    request_token_uri: 'https://api.twitter.com/oauth/request_token',
    login_dialog_uri: 'https://api.twitter.com/oauth/authenticate',
    access_token_uri: 'https://api.twitter.com/oauth/access_token',
    oauth_redirect_uri: 'http://localhost:4200/recipes',
  };
  constructor(private readonly httpService: HttpService) {
    this.oauthConsumer = new OAuth(
      'https://twitter.com/oauth/request_token',
      'https://twitter.com/oauth/access_token',
      process.env.TWITTER_APP_ID,
      process.env.TWITTER_APP_SECRET,
      '1.0A',
      'http://127.0.0.1:4200/auth',
      //'http://127.0.0.1:3000/auth/twitter/signin',
      'HMAC-SHA1',
    );
  }

  async requestTwitterRedirectUri(): Promise<{ redirect_uri: string } | any> {
    try {
      const { oauthRequestToken, oauthRequestTokenSecret } = await new Promise(
        (resolve, reject) => {
          this.oauthConsumer.getOAuthRequestToken(function (
            error,
            oauthRequestToken,
            oauthRequestTokenSecret,
            results,
          ) {
            return error
              ? reject(new Error('Error getting OAuth request token'))
              : resolve({
                  oauthRequestToken,
                  oauthRequestTokenSecret,
                });
          });
        },
      );
      this.oauthRequestToken = oauthRequestToken;
      this.oauthRequestTokenSecret = oauthRequestTokenSecret;

      return {
        redirect_uri: `${this.twitterConfig.login_dialog_uri}?oauth_token=${oauthRequestToken}`,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async twitterSignIn(oauthVerifier: string, request: Request): Promise<any> {
    const { oauthAccessToken, oauthAccessTokenSecret, results } =
      await new Promise((resolve, reject) => {
        this.oauthConsumer.getOAuthAccessToken(
          this.oauthRequestToken,
          this.oauthRequestTokenSecret,
          oauthVerifier,
          function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error
              ? reject(new Error('Error getting OAuth access token'))
              : resolve({ oauthAccessToken, oauthAccessTokenSecret, results });
          },
        );
      });

    const { user_id: userId } = results;
    const user = await promisify(
      this.oauthConsumer.get.bind(this.oauthConsumer),
    )(
      `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`,
      oauthAccessToken,
      oauthAccessTokenSecret,
    ).then((body) => JSON.parse(body));
    return user;
  }

  private parseTwitterResponse(response: string): {
    [key: string]: string | boolean;
  } {
    const regex = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
    const parsedResponse: { [key: string]: string } = {};

    let match: RegExpMatchArray = regex.exec(response);

    while (match) {
      match.shift();

      parsedResponse[match.shift()] = match.shift();

      match = regex.exec(response);
    }

    return parsedResponse;
  }
}
