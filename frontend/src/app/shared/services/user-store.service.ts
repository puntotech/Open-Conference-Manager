import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private _token: string = null;
  constructor() {
    this._token = localStorage.getItem("conf-token") || null;
  }

  removeToken() {
    this._token = null;
    localStorage.removeItem("conf-token");
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem("conf-token", token);
  }

  get token() {
    return this._token;
  }

  isLoggedIn() {
    return this.token !== null;
  }
}
