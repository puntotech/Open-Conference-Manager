import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth-service';

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
}
