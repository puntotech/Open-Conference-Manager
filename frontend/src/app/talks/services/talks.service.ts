import { Talk, TalkWithStatus } from "../../shared/models/talk.model";

import { AppSettings } from "src/app/app.settings";
import { CoSpeakerDto } from "src/app/shared/models/user";
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

  submit(id: number) {
    return this.httpClient.put<Talk>(
      `${AppSettings.API_ENDPOINT_TALKS}/submit/${id}`,
      {}
    );
  }

  addCospeaker(talk: CoSpeakerDto) {
    return this.httpClient.post<CoSpeakerDto>(
      `${AppSettings.API_ENDPOINT_COSPEAKERS}`,
      talk
    );
  }

  removeCospeaker(talk: CoSpeakerDto) {
    return this.httpClient.delete<CoSpeakerDto>(
      `${AppSettings.API_ENDPOINT_COSPEAKERS}`,
      { body: talk }
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
