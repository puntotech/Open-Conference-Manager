import { Component, Input, OnInit } from "@angular/core";

import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { Talk } from "src/app/shared/models/talk.model";

@Component({
  selector: "app-talk-preview",
  templateUrl: "./talk-preview.component.html",
  styleUrls: ["./talk-preview.component.css"],
})
export class TalkPreviewComponent implements OnInit {
  @Input() talk: Talk;

  constructor(private speakerStore: SpeakerStore) {}

  ngOnInit(): void {}

  submitTalk() {
    this.speakerStore.updateTalk({
      ...this.talk,
      submitted: new Date(),
    });
  }
}
