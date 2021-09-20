import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  me(): Observable<any> {
    return this.http.get(`${AppSettings.API_ENDPOINT_SPEAKERS}/me`);
  }

  updateMe(user: User) {
    console.log(AppSettings.API_ENDPOINT_SPEAKERS);
    return this.http.put<User>(`${AppSettings.API_ENDPOINT_SPEAKERS}/me`, user);
  }

  getSpeakers() {
    return this.http.get<User[]>(AppSettings.API_ENDPOINT_SPEAKERS);
  }
}
