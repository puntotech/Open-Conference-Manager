import { BadRequestException, Injectable } from '@nestjs/common';

import { OAuth } from 'oauth';
import { User } from 'src/shared/dto/user.dto';
import { promisify } from 'util';

@Injectable()
export class TwitterAuthService {
  private oauthConsumer: OAuth;
  private oauthRequestToken: string;
  private oauthRequestTokenSecret: string;

  private twitterConfig = {
    request_token_uri: 'https://api.twitter.com/oauth/request_token',
    login_dialog_uri: 'https://api.twitter.com/oauth/authenticate',
    access_token_uri: 'https://api.twitter.com/oauth/access_token',
    oauth_redirect_uri: 'http://localhost:4200/auth/loading',
  };
  constructor() {
    this.oauthConsumer = new OAuth(
      this.twitterConfig.request_token_uri,
      this.twitterConfig.access_token_uri,
      process.env.TWITTER_APP_ID,
      process.env.TWITTER_APP_SECRET,
      '1.0A',
      this.twitterConfig.oauth_redirect_uri,
      'HMAC-SHA1',
    );
  }

  async requestTwitterRedirectUri(): Promise<{ redirect_uri: string } | any> {
    try {
      const { oauthRequestToken, oauthRequestTokenSecret } = await new Promise(
        (resolve, reject) => {
          this.oauthConsumer.getOAuthRequestToken(
            (error, oauthRequestToken, oauthRequestTokenSecret) =>
              error
                ? reject(new Error('Error getting OAuth request token'))
                : resolve({
                    oauthRequestToken,
                    oauthRequestTokenSecret,
                  }),
          );
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

  async twitterSignIn(userParams: {
    oauth_token: string;
    oauth_verifier: string;
  }): Promise<User> {
    try {
      const { oauthAccessToken, oauthAccessTokenSecret, results } =
        await new Promise((resolve, reject) => {
          this.oauthConsumer.getOAuthAccessToken(
            this.oauthRequestToken,
            this.oauthRequestTokenSecret,
            userParams.oauth_verifier,
            (error, oauthAccessToken, oauthAccessTokenSecret, results) =>
              error
                ? reject(new Error('Error getting OAuth access token'))
                : resolve({
                    oauthAccessToken,
                    oauthAccessTokenSecret,
                    results,
                  }),
          );
        });

      const {
        id,
        email,
        name,
        profile_image_url,
        profile_image_url_https,
        location,
      } = await promisify(this.oauthConsumer.get.bind(this.oauthConsumer))(
        `https://api.twitter.com/1.1/account/verify_credentials.json?user_id=${results.user_id}&include_email=true`,
        oauthAccessToken,
        oauthAccessTokenSecret,
      ).then((body) => JSON.parse(body));

      return {
        id,
        email,
        name,
        photoUrl: profile_image_url || profile_image_url_https,
        locale: location,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
