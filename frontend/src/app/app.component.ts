import { SocialAuthService, SocialUser } from "angularx-social-login";

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(public authService: SocialAuthService) {}
}