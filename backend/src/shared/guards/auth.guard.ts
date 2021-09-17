import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext) {
    return this.authService.checkToken(context);
  }
}
