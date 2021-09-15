import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
/* import { LoginService } from "@modules/login/login.service"; */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(/* protected readonly loginService: LoginService */) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /*   return this.loginService.checkToken(context);
    } */
    return true;
  }
}
