import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './facebook/facebook-auth.guard';
import { GoogleAuthService } from './google/google-auth.service';
import { TwitterAuthGuard } from './twitter/twitter-auth.guard';
import { TwitterAuthService } from './twitter/twitter.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly twitterAuthService: TwitterAuthService,
  ) {}

  @Post('google-login')
  googleLogin(@Body('access_token') access_token: string) {
    return this.authService.loginWithThirdParty(() =>
      this.googleAuthService.getUser(access_token),
    );
  }

  //TODO: need a access_token post variable
  @UseGuards(FacebookAuthGuard)
  @Post('facebook-login')
  facebookLogin(@Request() req) {
    return this.authService.loginWithThirdParty(() => req.user);
  }

  @UseGuards(TwitterAuthGuard)
  @Post('twitter-login')
  twitterLogin(@Request() req) {
    return this.authService.loginWithThirdParty(() => req.user);
  }

  @Get('twitter/uri')
  async requestTwitterRedirectUri(): Promise<any> {
    return await this.twitterAuthService.requestTwitterRedirectUri();
  }

  @Get('twitter/signin')
  async twitterSignIn(
    @Query('oauth_token') oauth_token: string,
    @Query('oauth_verifier') oauth_verifier: string,
    @Request() request,
  ): Promise<any> {
    return await this.twitterAuthService.twitterSignIn(oauth_verifier, request);
  }
}
