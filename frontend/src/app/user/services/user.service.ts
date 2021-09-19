import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { catchError, concatMap, map, tap } from "rxjs/operators";

import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user";
import { UserStoreService } from "../../shared/services/user-store.service";
import { routes } from "src/app/shared/consts/routes";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public user$: Subject<User> = new BehaviorSubject(null);
  private _redirectUrl: string;

  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private router: Router,
  ) {}

  loadUserData() {
    return this.me()
      .pipe(
        map((res: User) => this.user$.next(res)),
        catchError((e) => of(e.message))
      )
      .toPromise();
  }

  login(options /*:  Login */): Observable<any> {
    return this.http
      .post(options.endpoint, { accessToken: options.accessToken })
      .pipe(
        tap((res: any) => {
          localStorage.setItem(
            AppSettings.APP_LOCALSTORAGE_TOKEN,
            res.accessToken
          );
        }),
        concatMap(() => this.me()),
        tap((user) => this.user$.next(user)),
        tap(() => this.router.navigate([routes.DASHBOARD]))
      );
  }

  me(): Observable<any> {
    return this.http.get(`${AppSettings.API_ENDPOINT_SPEAKERS}/me`);
  }


  update(userID: string, user: User) {
    return this.http.put<User>(`${AppSettings.API_ENDPOINT_SPEAKERS}/${userID}`, user);
  }

  logout() {
    this.userStore.removeToken();
    this.user$.next(null);
    //    this.authService.signOut();
  }

  isLoggedIn() {
    return this.userStore.isLoggedIn();
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }
}
