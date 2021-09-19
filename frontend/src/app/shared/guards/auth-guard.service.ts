import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SpeakerStore } from "../state/speaker.store";
import { routes } from "../consts/routes";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private speakerStore: SpeakerStore, private router: Router) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.speakerStore.speaker$.pipe(
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
