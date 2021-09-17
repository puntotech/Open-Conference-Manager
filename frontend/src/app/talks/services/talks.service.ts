import { Observable, of } from "rxjs";
import { Speaker, Talk } from "../models/talk.model";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/user/models/user";
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TalksService {
  private API_ENDPOINT = "http://localhost:3000/talks";
  private USER_ENDPOINT = "http://localhost:3000/speakers";

  constructor(private httpClient: HttpClient) {}

  getTalks(): Observable<Talk[]> {
    return this.httpClient.get<User>(`${this.USER_ENDPOINT}/1`).pipe(
      filter((speaker) => !!speaker.talks),
      map(({ talks }) => talks)
    );
  }

  getTalk(talkID: string) {
    return this.httpClient.get<Talk>(`${this.API_ENDPOINT}/${talkID}`);
  }

  addCoSpeaker(talkID: string, email: string) {
    return this.httpClient.put(`${this.API_ENDPOINT}/${talkID}`, email);
  }

  submit(talk: Talk) {
    const submittedTalk = { ...talk, submitted: new Date() };
    return this.update(submittedTalk);
  }

  create(talk: Talk) {
    return this.httpClient.post<Talk>(this.API_ENDPOINT, talk);
  }

  delete(talkId: string) {
    return this.httpClient.delete<Talk>(`${this.API_ENDPOINT}/${talkId}`);
  }

  update(talk: Talk) {
    return this.httpClient.put<Talk>(this.API_ENDPOINT, talk);
  }
}