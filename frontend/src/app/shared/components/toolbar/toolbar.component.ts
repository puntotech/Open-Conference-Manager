import { Component, OnInit } from "@angular/core";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { SpeakerStore } from "../../state/speaker.store";
import { UserService } from "src/app/user/services/user.service";
import { routes } from "src/app/shared/consts/routes";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  faUser = faUser;
  faSignOut = faSignOutAlt;
  speaker$ = this.speakerStore.speaker$;

  constructor(
    public authService: AuthService,
    private router: Router,
    private readonly speakerStore: SpeakerStore
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate([routes.LOGIN]);
  }
}
