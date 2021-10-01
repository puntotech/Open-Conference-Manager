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

  // need a access_token post variable
  @UseGuards(FacebookAuthGuard)
  @Post('facebook-login')
  facebookLogin(@Request() req) {
    return this.authService.loginWithThirdParty(() => req.user);
  }

  @Get('twitter/uri')
  requestTwitterRedirectUri(): Promise<any> {
    return this.twitterAuthService.requestTwitterRedirectUri();
  }

  @Post('twitter/signin')
  async twitterSignIn(
    @Body() userParams: { oauth_token: string; oauth_verifier: string },
  ): Promise<any> {
    return this.authService.loginWithThirdParty(() =>
      this.twitterAuthService.twitterSignIn(userParams),
    );
  }
}
