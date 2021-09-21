import { Talk, TalkWithStatus } from "../../shared/models/talk.model";

import { AppSettings } from "src/app/app.settings";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TalksService {
  constructor(private httpClient: HttpClient) {}

  getTalk(talkID: number) {
    return this.httpClient.get<TalkWithStatus>(
      `${AppSettings.API_ENDPOINT_TALKS}/${talkID}`
    );
  }

  submit(talk: Talk) {
    const submittedTalk = { ...talk, submitted: new Date() };
    return this.update(submittedTalk);
  }

  addCospeaker(talk: TalkWithStatus) {
    return this.httpClient.post<TalkWithStatus>(
      `${AppSettings.API_ENDPOINT_TALKS}/cospeaker`,
      talk
    );
  }

  create(talk: Talk) {
    return this.httpClient.post<Talk>(AppSettings.API_ENDPOINT_TALKS, talk);
  }

  delete(talkId: number) {
    return this.httpClient.delete<Talk>(
      `${AppSettings.API_ENDPOINT_TALKS}/${talkId}`
    );
  }

  update(talk: Talk) {
    return this.httpClient.put<Talk>(AppSettings.API_ENDPOINT_TALKS, talk);
  }
}
