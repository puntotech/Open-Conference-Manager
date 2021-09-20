import { AppSettings } from "src/app/app.settings";
import { Injectable } from "@angular/core";

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
}
