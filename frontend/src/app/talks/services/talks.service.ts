import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Talk } from "../../shared/models/talk.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TalksService {
  constructor(private httpClient: HttpClient) {}

  getTalk(talkID: number) {
    return this.httpClient.get<Talk>(
      `${AppSettings.API_ENDPOINT_TALKS}/${talkID}`
    );
  }

  submit(talk: Talk) {
    const submittedTalk = { ...talk, submitted: new Date() };
    return this.update(submittedTalk);
  }

  create(talk: Talk) {
    return this.httpClient.post<Talk>(AppSettings.API_ENDPOINT_TALKS, talk);
  }

  delete(talkId: number) {
    return this.httpClient.delete<Talk>(`${AppSettings.API_ENDPOINT_TALKS}/${talkId}`);
  }

  update(talk: Talk) {
    return this.httpClient.put<Talk>(AppSettings.API_ENDPOINT_TALKS, talk);
  }
}
