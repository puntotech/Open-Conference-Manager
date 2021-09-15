import { Observable, of } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Talk } from "../models/talk";

@Injectable({
  providedIn: "root",
})
export class TalksService {
  private API_ENDPOINT = "http://localhost:9001/talks";
  private talks: any[] = [
    {
      id: "1",
      title: "RxJS Powered: Flappy Bird",
      abstract:
        "Building flappy bird with RxJs because it's awesome and we can do it",
      level: "Intermediate",
      language: "English",
      comments: "Minimum knowledge of RxJS is required",
      created: Date.now(),
      speakers: ["Carlos Caballero", "Estefanía García"],
    },
    {
      id: "2",
      title: "NestJS: Angular ARchitecture",
      abstract:
        "Building flappy bird with RxJs because it's awesome and we can do it",
      level: "Intermediate",
      language: "English",
      comments: "Minimum knowledge of RxJS is required",
      created: Date.now(),
      speakers: ["Carlos Caballero", "Estefanía García"],
    },
  ];
  constructor(private httpClient: HttpClient) {}

  getTalks(): Observable<Talk[]> {
    //return this.httpClient.get<Talk[]>(`${this.API_ENDPOINT}/all`);
    return of(this.talks);
  }

  getTalk(talkID: string) {
    //return this.httpClient.get<Talk>(`${this.API_ENDPOINT}/${talkID}`);
    return of(this.talks.find((talk) => talk.id === talkID));
  }

  addCoSpeaker(talkID: string, email: string) {
    return this.httpClient.put(`${this.API_ENDPOINT}/${talkID}`, email);
  }

  submit(talk: Talk) {
    const submittedTalk = { ...talk, submitted: new Date() };
    return this.update(talk.id, submittedTalk);
  }

  create(talk: Talk) {
    return this.httpClient.post<Talk>(this.API_ENDPOINT, talk);
  }

  delete(talkId: string) {
    //return this.httpClient.delete<Talk>(`${this.API_ENDPOINT}/${talkId}`);
    console.log("Deleting talk with id", talkId);
    return of("Deleted");
  }

  update(talkId: string, talk: Talk) {
    return this.httpClient.put<Talk>(`${this.API_ENDPOINT}/${talkId}`, talk);
  }
}
