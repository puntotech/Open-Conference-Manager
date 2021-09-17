import { Injectable } from "@angular/core";
import { AppSettings } from "src/app/app.settings";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private _token: string = null;
  constructor() {
    this._token =
      localStorage.getItem(AppSettings.APP_LOCALSTORAGE_TOKEN) || null;
  }

  removeToken() {
    this._token = null;
    localStorage.removeItem(AppSettings.APP_LOCALSTORAGE_TOKEN);
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem(AppSettings.APP_LOCALSTORAGE_TOKEN, token);
  }

  get token() {
    return this._token;
  }

  isLoggedIn() {
    return this.token !== null;
  }
}
