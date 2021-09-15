import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Talk } from "src/app/talks/models/talk";
import { TalksService } from "../../services/talks.service";

@Component({
  selector: "app-talk-list",
  templateUrl: "./talk-list.component.html",
  styleUrls: ["./talk-list.component.css"],
})
export class TalkListComponent implements OnInit {
  public talk$: Observable<Talk[]>;
  constructor(private talksService: TalksService) {}

  ngOnInit() {
    this.talk$ = this.talksService.getTalks();
  }
}
