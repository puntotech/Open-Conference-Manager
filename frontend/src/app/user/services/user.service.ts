import { concatMap, tap } from "rxjs/operators";

import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user";
import { UserStoreService } from "../../shared/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _redirectUrl: string;

  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
  ) {}

  
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
    //this.user$.next(null);
    //    this.authService.signOut();
  }

  isLoggedIn() {
    return this.userStore.isLoggedIn();
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }
}
