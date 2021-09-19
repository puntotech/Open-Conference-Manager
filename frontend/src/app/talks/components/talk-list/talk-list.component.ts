import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "../../services/talks.service";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-talk-list",
  templateUrl: "./talk-list.component.html",
  styleUrls: ["./talk-list.component.css"],
})
export class TalkListComponent implements OnInit {
  /* public talk$: Observable<Talk[]>; */
  public user$ = this.userService.user$;
  constructor(private talksService: TalksService, private userService: UserService) {}

  
  ngOnInit() {
  /*   this.talk$ = this.talksService.getTalks(); */
  }
}
