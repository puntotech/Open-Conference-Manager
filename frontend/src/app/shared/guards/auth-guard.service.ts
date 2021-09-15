import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, map, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SocialAuthService } from "angularx-social-login";
import { UserService } from "src/app/user/services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("AuthGuard#canActivate called");

    return this.authService.authState.pipe(
      map((user) => !!user),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate;
        }
      })
    );

    /* if (this.authService.authState) {
      console.log(this.authService.authState);
      return true;
    }

    console.log("AuthGuard#canActivate not authorized to access page");

    this.router.navigate(["/user/login"], {
      queryParams: { returnUrl: state.url },
    });

    return false; */
  }
}
