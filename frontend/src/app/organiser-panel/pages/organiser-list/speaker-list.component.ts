import { Component, OnInit } from "@angular/core";

import { UserService } from "../../../user/services/user.service";

@Component({
  selector: "app-speaker-list",
  templateUrl: "./speaker-list.component.html",
  styleUrls: ["./speaker-list.component.css"],
})
export class SpeakerListComponent implements OnInit {
  speaker$ = this.userService.getSpeakers();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
