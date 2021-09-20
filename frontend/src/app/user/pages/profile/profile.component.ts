import { Component, OnInit } from "@angular/core";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { AuthService } from "src/app/auth/services/auth.service";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  speaker$ = this.speakerStore.speaker$;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  constructor(
    private authService: AuthService,
    private readonly speakerStore: SpeakerStore
  ) {}

  signOut() {
    this.authService.logout();
  }
}
