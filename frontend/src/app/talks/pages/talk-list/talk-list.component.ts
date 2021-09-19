import { Component, OnInit } from "@angular/core";

import { SpeakerStore } from "src/app/shared/state/speaker.store";

@Component({
  selector: "app-talk-list",
  templateUrl: "./talk-list.component.html",
  styleUrls: ["./talk-list.component.css"],

})
export class TalkListComponent {
  public speaker$ = this.speakerStore.speaker$;
  constructor(private readonly speakerStore: SpeakerStore) {}

}
