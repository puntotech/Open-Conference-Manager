import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './facebook/facebook-auth.guard';
import { GoogleAuthService } from './google/google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('google-login')
  googleLogin(@Body('accessToken') accessToken: string) {
    return this.authService.loginWithThirdParty(() =>
      this.googleAuthService.getUser(accessToken),
    );
  }

  //TODO: need a access_token post variable
  @UseGuards(FacebookAuthGuard)
  @Post('facebook-login')
  facebooklogin(@Request() req) {
    return this.authService.loginWithThirdParty(() => req.user);
  }
}
