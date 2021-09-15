import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /*  const request: Request = context.switchToHttp().getRequest();
    return request.user.admin; */
    return true;
  }
}
