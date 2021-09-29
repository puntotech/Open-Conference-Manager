import { faCog, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

import { Component } from "@angular/core";
import { Role } from "../../models/role.model";
import { SpeakerStore } from "../../state/speaker.store";
import { User } from "../../models/user";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent {
  speaker$ = this.speakerStore.speaker$;
  faUser = faUser;
  faPaperPlane = faPaperPlane;
  faCog = faCog;

  constructor(private readonly speakerStore: SpeakerStore) {}

  isAdmin(user: User) {
    return user.role === Role.ADMIN;
  }
}
