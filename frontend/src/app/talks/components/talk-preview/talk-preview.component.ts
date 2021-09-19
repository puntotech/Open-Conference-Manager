import { Component, Input, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "../../services/talks.service";

@Component({
  selector: "app-talk-preview",
  templateUrl: "./talk-preview.component.html",
  styleUrls: ["./talk-preview.component.css"],
})
export class TalkPreviewComponent implements OnInit {
  @Input() talk: Talk;

  constructor(private talksService: TalksService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  submitTalk() {
    this.talksService.submit(this.talk);
  }
}
