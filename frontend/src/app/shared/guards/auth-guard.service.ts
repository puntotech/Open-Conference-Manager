import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/services/user.service";
import { routes } from "src/app/consts/routes";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.user$.pipe(
      map((user) => !!user),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate([routes.LOGIN], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
