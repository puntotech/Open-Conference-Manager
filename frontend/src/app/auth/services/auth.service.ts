import { Observable, of } from "rxjs";
import { catchError, concatMap, map, tap } from "rxjs/operators";

import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/user/services/user.service";
import { UserStoreService } from "src/app/shared/services/user-store.service";
import { routes } from "src/app/shared/consts/routes";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private userService: UserService,
    private speakerStore: SpeakerStore,
    private readonly router: Router
  ) {}

  loadUserData() {
    if (!this.userStore.token) {
      return;
    }
    return this.userService
      .me()
      .pipe(
        map((res: User) => this.speakerStore.loadSpeaker(res)),
        catchError((e) => of(e.message))
      )
      .toPromise();
  }

  login(options: { endpoint: string; data: any }): Observable<any> {
    return this.http.post(options.endpoint, options.data).pipe(
      tap((res: any) => (this.userStore.token = res.access_token)),
      concatMap(() => this.userService.me()),
      tap((speaker) => this.speakerStore.loadSpeaker(speaker)),
      tap(() => this.router.navigate([routes.DASHBOARD]))
    );
  }

  requestTwitterRedirectUri() {
    return this.http.get("http://localhost:3000/auth/twitter/uri");
  }

  logout() {
    this.userStore.removeToken();
  }
}
