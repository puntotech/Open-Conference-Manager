import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook-token') {
  private request: Request;
  canActivate(context: ExecutionContext) {
    this.request = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new HttpException(err.message, 401);
    }
    return user;
  }
}
