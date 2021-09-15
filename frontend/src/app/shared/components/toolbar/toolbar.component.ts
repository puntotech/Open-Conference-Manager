import { Component, OnInit } from "@angular/core";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  faUser = faUser;
  faSignOut = faSignOutAlt;

  constructor(public authService: SocialAuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.signOut();
    this.router.navigate(["/user/login"]);
  }
}
