import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  me(): Observable<any> {
    return this.http.get(`${AppSettings.API_ENDPOINT_SPEAKERS}/me`);
  }

  updateMe(user: User) {
    return this.http.put<User>(`${AppSettings.API_ENDPOINT_SPEAKERS}/me`, user);
  }

  getSpeakers() {
    return this.http.get<User[]>(AppSettings.API_ENDPOINT_SPEAKERS);
  }

  getSpeakersWithTalks() {
    return this.http.get<User[]>(AppSettings.API_ENDPOINT_ADMIN);
  }

  getSpeakerById(id: number) {
    return this.http.get<User>(`${AppSettings.API_ENDPOINT_SPEAKERS}/${id}`);
  }
}
