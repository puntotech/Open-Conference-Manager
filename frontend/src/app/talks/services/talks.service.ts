import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Talk } from "../../shared/models/talk.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TalksService {
  private API_ENDPOINT = "http://localhost:3000/talks";

  constructor(private httpClient: HttpClient) {}

  //TODO: REMOVE
  getTalks(): Observable<Talk[]> {
    return this.httpClient
      .get<Talk[]>(`${this.API_ENDPOINT}/me`)
      .pipe(map((talks) => talks));
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
